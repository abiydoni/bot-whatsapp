const pino = require("pino");
const path = require("path");
const fs = require("fs-extra");
const crypto = require("crypto");
const axios = require("axios");
const {
  makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");
const qrcode = require("qrcode");
const DatabaseManager = require("./DatabaseManager");
const botConfig = require("../config/botConfig");

class WhatsAppManager {
  constructor() {
    this.clients = new Map();
    this.authBaseDir = path.join(__dirname, "../auth");
    this.db = new DatabaseManager();
    this.logger = pino({
      level: "info",
      transport: {
        target: "pino-pretty",
        options: {
          colorize: true,
        },
      },
    });
    this.numberToSessionMap = new Map();
  }

  // ----------------------
  // Utility Methods
  // ----------------------
  generateSessionId() {
    return crypto.randomBytes(16).toString("hex");
  }

  formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) throw new Error("Phone number is required");

    let cleaned = phoneNumber.replace(/\D/g, "");

    if (cleaned.startsWith("0")) {
      return "62" + cleaned.substring(1);
    } else if (cleaned.startsWith("62")) {
      return cleaned;
    } else if (cleaned.startsWith("+62")) {
      return cleaned.substring(1);
    } else if (cleaned.length >= 9) {
      return "62" + cleaned;
    }

    throw new Error("Invalid phone number format");
  }

  // ----------------------
  // WhatsApp Initialization
  // ----------------------
  async initWhatsApp(
    sessionId,
    numberId,
    isRecovery = false,
    owner = null,
    ownerCompany = null
  ) {
    console.log("DEBUG initWhatsApp owner param:", owner);
    try {
      const authDir = path.join(this.authBaseDir, sessionId);

      if (isRecovery) {
        try {
          // Try to find numberId from database
          const sessionData = await this.db.getSession(sessionId);
          if (sessionData) {
            numberId = sessionData.numberId;
            ownerCompany = sessionData.ownerCompany;
          }

          // If not found in database, try to read from metadata file
          if (!numberId) {
            const metaFile = path.join(authDir, "metadata.json");
            try {
              const metaData = JSON.parse(await fs.readFile(metaFile, "utf-8"));
              numberId = metaData.numberId;
              ownerCompany = metaData.ownerCompany;
            } catch (e) {
              this.logger.warn(`No metadata found for session ${sessionId}`);
            }
          }
        } catch (error) {
          this.logger.warn(
            `Failed to recover numberId for ${sessionId}:`,
            error
          );
        }
      } else {
        await fs.mkdir(authDir, { recursive: true });
      }

      const { state, saveCreds } = await useMultiFileAuthState(authDir, {
        logger: this.logger.child({ level: "silent" }),
      });

      const { version } = await fetchLatestBaileysVersion();
      this.logger.info(`Using WA v${version.join(".")}`);

      const sock = makeWASocket({
        version,
        auth: {
          creds: state.creds,
          keys: state.keys,
        },
        printQRInTerminal: false,
        logger: this.logger.child({ level: "error" }),
        markOnlineOnConnect: false,
        syncFullHistory: false,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 30000,
      });

      const clientData = {
        sock,
        qrData: null,
        isConnected: false,
        numberId,
        isRecovery,
        reconnectAttempts: 0,
        maxReconnectAttempts: 5,
        createdAt: new Date(),
        lastActivity: null,
        authData: state,
        connectedAt: null,
        owner: owner || null,
        ownerCompany: ownerCompany || null,
      };
      console.log("DEBUG clientData.owner:", clientData.owner);

      if (isRecovery) {
        const sessionData = await this.db.getSession(sessionId);
        if (sessionData && sessionData.connectedAt) {
          clientData.connectedAt = sessionData.connectedAt;
        }
      }

      this.clients.set(sessionId, clientData);

      if (numberId && !isRecovery) {
        await this.db.saveSession(sessionId, {
          numberId,
          isConnected: false,
          createdAt: new Date(),
          lastActivity: null,
          authData: state,
          metadata: { isRecovery: false },
          connectedAt: null,
          owner: owner || null,
          ownerCompany: ownerCompany || null,
        });
      }

      this.setupSocketEvents(sock, sessionId, numberId, saveCreds);

      if (isRecovery && state.creds.registered) {
        this.logger.info(`Attempting to recover session: ${sessionId}`);
        setTimeout(() => {
          if (!clientData.isConnected) {
            sock.ev.emit("connection.update", { connection: "connecting" });
          }
        }, 2000);
      }

      return clientData;
    } catch (error) {
      this.logger.error(`Initialization error: ${error.message}`);
      if (isRecovery) {
        this.scheduleReconnect(sessionId, numberId, true);
      }
      throw error;
    }
  }

  // ----------------------
  // Socket Event Handlers
  // ----------------------
  setupSocketEvents(sock, sessionId, numberId, saveCreds) {
    const clientData = this.clients.get(sessionId);

    sock.ev.on("creds.update", saveCreds);

    sock.ev.on("connection.update", async (update) => {
      try {
        const { connection, lastDisconnect, qr } = update;
        clientData.lastActivity = new Date();

        this.logger.info(`Connection update for ${numberId || sessionId}:`, {
          connection,
          qr: !!qr,
          currentStatus: clientData.isConnected,
          lastDisconnect: lastDisconnect?.error?.output?.statusCode,
        });

        if (qr) {
          try {
            clientData.qrData = await qrcode.toDataURL(qr);
            clientData.isConnected = false;
            this.logger.info(`QR Code generated for ${numberId || sessionId}`);
          } catch (error) {
            this.logger.error("QR generation error:", error);
          }
        }

        if (connection === "open") {
          clientData.isConnected = true;
          clientData.qrData = null;
          clientData.reconnectAttempts = 0;
          if (!clientData.connectedAt) {
            clientData.connectedAt = new Date();
          }
          this.logger.info(
            `✅ WhatsApp ${
              clientData.isRecovery ? "recovered" : "connected"
            } for ${numberId || sessionId}`
          );

          // Simpan status session ke database
          await this.db.saveSession(sessionId, {
            numberId: clientData.numberId,
            isConnected: true,
            createdAt: clientData.createdAt,
            lastActivity: new Date(),
            authData: clientData.authData,
            metadata: { isRecovery: clientData.isRecovery },
            connectedAt: clientData.connectedAt,
            owner: clientData.owner,
          });

          // Notify all connected clients about the connection status change
          if (clientData.clients && clientData.clients.length > 0) {
            const status = this.getSessionStatus(sessionId);
            this.logger.info(
              `Sending status update to ${clientData.clients.length} clients:`,
              status
            );

            // Send status update to all connected clients
            for (const client of clientData.clients) {
              try {
                if (!client.res.writableEnded) {
                  client.res.write(`data: ${JSON.stringify(status)}\n\n`);
                  this.logger.debug(
                    `Status update sent to client ${client.id}`
                  );
                } else {
                  this.logger.warn(
                    `Client ${client.id} connection ended, removing from clients list`
                  );
                  clientData.clients = clientData.clients.filter(
                    (c) => c.id !== client.id
                  );
                }
              } catch (error) {
                this.logger.error(
                  `Error sending status update to client ${client.id}:`,
                  error
                );
                clientData.clients = clientData.clients.filter(
                  (c) => c.id !== client.id
                );
              }
            }
          } else {
            this.logger.warn(
              `No clients connected to receive status update for session ${sessionId}`
            );
          }
        }

        if (connection === "close") {
          clientData.isConnected = false;
          clientData.connectedAt = new Date();
          const shouldReconnect = this.shouldAttemptReconnect(lastDisconnect);

          await this.db.saveSession(sessionId, {
            numberId: clientData.numberId,
            isConnected: false,
            createdAt: clientData.createdAt,
            lastActivity: new Date(),
            authData: clientData.authData,
            metadata: {
              isDisconnected: true,
              lastDisconnect: new Date().toISOString(),
            },
            connectedAt: clientData.connectedAt,
            owner: clientData.owner,
          });

          if (shouldReconnect) {
            clientData.reconnectAttempts++;
            this.scheduleReconnect(
              sessionId,
              numberId,
              clientData.isRecovery,
              clientData.owner
            );
          } else {
            // Check if it's a conflict error
            const isConflictError =
              lastDisconnect?.error?.output?.statusCode === 409;
            const isDeviceRemoved =
              lastDisconnect?.error?.output?.statusCode === 401 &&
              lastDisconnect?.error?.output?.content?.[0]?.attrs?.type ===
                "device_removed";

            if (isDeviceRemoved) {
              this.logger.warn(
                `Device removed for session ${sessionId}, cleaning up...`
              );
              await this.deleteAuthFiles(sessionId);
              this.clients.delete(sessionId);
              return;
            }

            if (isConflictError) {
              this.logger.warn(
                `Conflict detected for session ${sessionId}, attempting recovery...`
              );
              try {
                // Try to recover the session
                await this.initWhatsApp(
                  sessionId,
                  numberId,
                  true,
                  clientData.owner
                );
                this.logger.info(
                  `Session ${sessionId} recovered after conflict`
                );
                return;
              } catch (recoveryError) {
                this.logger.error(
                  `Failed to recover session ${sessionId} after conflict:`,
                  recoveryError
                );
              }
            }

            this.logger.warn(`Session ${sessionId} disconnected permanently`);
            if (
              lastDisconnect?.error?.output?.statusCode ===
              DisconnectReason.loggedOut
            ) {
              this.logger.info(
                `User logged out from phone for session ${sessionId}`
              );
              await this.deleteAuthFiles(sessionId);
              this.clients.delete(sessionId);

              try {
                const sessionData = await this.db.getSession(sessionId);
                if (sessionData) {
                  this.logger.info(
                    `Attempting to recover session ${sessionId} from database...`
                  );
                  await this.initWhatsApp(
                    sessionId,
                    sessionData.numberId,
                    true,
                    sessionData.owner || null
                  );
                  this.logger.info(
                    `Session ${sessionId} recovered from database`
                  );
                }
              } catch (recoveryError) {
                this.logger.error(
                  `Failed to recover session ${sessionId} from database:`,
                  recoveryError
                );
              }
            }
          }

          // Notify all connected clients about the disconnection
          if (clientData.clients && clientData.clients.length > 0) {
            const status = this.getSessionStatus(sessionId);
            this.logger.info(
              `Sending disconnection status to ${clientData.clients.length} clients:`,
              status
            );

            for (const client of clientData.clients) {
              try {
                if (!client.res.writableEnded) {
                  client.res.write(`data: ${JSON.stringify(status)}\n\n`);
                  this.logger.debug(
                    `Disconnection status sent to client ${client.id}`
                  );
                } else {
                  this.logger.warn(
                    `Client ${client.id} connection ended, removing from clients list`
                  );
                  clientData.clients = clientData.clients.filter(
                    (c) => c.id !== client.id
                  );
                }
              } catch (error) {
                this.logger.error(
                  `Error sending disconnection status to client ${client.id}:`,
                  error
                );
                clientData.clients = clientData.clients.filter(
                  (c) => c.id !== client.id
                );
              }
            }
          }
        }
      } catch (error) {
        this.logger.error("Error in connection.update handler:", error);
      }
    });

    sock.ev.on("messages.upsert", async ({ messages, type }) => {
      clientData.lastActivity = new Date();

      // Debug logging untuk memastikan event handler terpanggil
      this.logger.info(
        `🔍 Bot Debug: messages.upsert event triggered - type: ${type}, messages count: ${
          messages?.length || 0
        }`
      );

      // Bot Auto-Reply Logic
      if (!botConfig.bot.enabled) {
        this.logger.info(`🔍 Bot Debug: Bot is disabled in config`);
        return;
      }

      if (!messages || type !== "notify") {
        this.logger.info(
          `🔍 Bot Debug: Skipping - no messages or type not notify`
        );
        return;
      }

      const msg = messages[0];
      const sender = msg.key.remoteJid;

      this.logger.info(`🔍 Bot Debug: Processing message from ${sender}`);

      // Skip group messages if configured
      if (botConfig.bot.skipGroupMessages && sender.endsWith("@g.us")) {
        this.logger.info(`🔍 Bot Debug: Skipping group message from ${sender}`);
        return;
      }

      const text =
        msg.message?.conversation || msg.message?.extendedTextMessage?.text;

      this.logger.info(`🔍 Bot Debug: Message text: "${text}"`);

      if (
        !text ||
        text.length < botConfig.message.minLength ||
        text.length > botConfig.message.maxLength
      ) {
        this.logger.info(
          `🔍 Bot Debug: Skipping - invalid text length or empty`
        );
        return;
      }

      if (botConfig.message.logIncoming) {
        this.logger.info(
          `${botConfig.bot.logPrefix} Pesan dari ${sender}: ${text}`
        );
      }

      const lowerText = text.toLowerCase().trim();
      this.logger.info(`🔍 Bot Debug: Processing keyword: "${lowerText}"`);

      // Logika Menu Dinamis ===================================================
      try {
        this.logger.info(
          `🔍 Bot Debug: Making API call to ${botConfig.bot.apiUrl}`
        );

        const response = await axios.get(
          `${botConfig.bot.apiUrl}?key=${encodeURIComponent(lowerText)}`,
          {
            headers: { "User-Agent": botConfig.bot.userAgent },
            timeout: botConfig.bot.timeout,
          }
        );

        this.logger.info(
          `🔍 Bot Debug: API response received: ${response.data.substring(
            0,
            100
          )}...`
        );

        const reply = response.data.trim();

        if (reply && reply !== "") {
          this.logger.info(`🔍 Bot Debug: Sending reply to ${sender}`);
          await sock.sendMessage(sender, {
            text: reply,
          });
          this.logger.info(
            `${botConfig.bot.logPrefix} Auto-reply sent to ${sender}`
          );
        } else {
          this.logger.info(`🔍 Bot Debug: Empty reply from API, not sending`);
        }
      } catch (error) {
        this.logger.error(
          `${botConfig.bot.logPrefix} Gagal akses menu.php:`,
          error.message
        );
        try {
          this.logger.info(`🔍 Bot Debug: Sending error message to ${sender}`);
          await sock.sendMessage(sender, {
            text: botConfig.bot.errorMessage,
          });
        } catch (sendError) {
          this.logger.error(
            `${botConfig.bot.logPrefix} Gagal kirim error message:`,
            sendError.message
          );
        }
      }
      // ========================================================================
    });
  }

  shouldAttemptReconnect(lastDisconnect) {
    if (!lastDisconnect?.error) return true;

    const statusCode = lastDisconnect.error.output?.statusCode;
    return (
      statusCode !== DisconnectReason.loggedOut &&
      statusCode !== DisconnectReason.badSession
    );
  }

  scheduleReconnect(sessionId, numberId, isRecovery, owner) {
    const clientData = this.clients.get(sessionId);
    if (
      !clientData ||
      clientData.reconnectAttempts >= clientData.maxReconnectAttempts
    ) {
      this.logger.warn(`Max reconnect attempts reached for ${sessionId}`);
      if (numberId) {
        this.removeSessionMapping(numberId);
      }
      this.clients.delete(sessionId);
      return;
    }

    const delay = Math.min(30000, clientData.reconnectAttempts * 5000);
    this.logger.warn(
      `🔄 Reconnecting ${sessionId} in ${delay}ms (attempt ${clientData.reconnectAttempts})`
    );

    setTimeout(() => {
      this.initWhatsApp(
        sessionId,
        numberId,
        isRecovery,
        clientData.owner,
        clientData.ownerCompany
      ).catch((error) => {
        this.logger.error(`Reconnect error: ${error.message}`);
        if (clientData.reconnectAttempts < clientData.maxReconnectAttempts) {
          this.scheduleReconnect(
            sessionId,
            numberId,
            isRecovery,
            clientData.owner
          );
        }
      });
    }, delay);
  }

  // ----------------------
  // Session Management
  // ----------------------
  async recoverSessions() {
    try {
      const sessions = await this.db.getAllSessions();

      for (const session of sessions) {
        try {
          this.logger.info(
            `Attempting to recover session: ${session.sessionId}`
          );
          await this.initWhatsApp(
            session.sessionId,
            session.numberId,
            true,
            session.owner || null
          );
        } catch (error) {
          this.logger.error(
            `Error recovering session ${session.sessionId}:`,
            error
          );
        }
      }
    } catch (error) {
      this.logger.error(`Session recovery error: ${error.message}`);
    }
  }

  async deleteAuthFiles(sessionId) {
    const authDir = path.join(this.authBaseDir, sessionId);
    try {
      if (!(await fs.pathExists(authDir))) {
        this.logger.warn(
          `Auth directory does not exist for session ${sessionId}`
        );
        return true;
      }

      await fs.remove(authDir);
      this.logger.info(`Auth directory deleted for session ${sessionId}`);
      return true;
    } catch (err) {
      this.logger.error(
        `Error deleting auth directory for session ${sessionId}:`,
        err
      );
      return false;
    }
  }

  async logout(sessionId) {
    const clientData = this.clients.get(sessionId);
    if (!clientData) return false;

    try {
      if (clientData.sock) {
        await clientData.sock.end();
        await clientData.sock.ws.close();
      }

      const now = new Date();
      await this.db.saveSession(sessionId, {
        numberId: clientData.numberId,
        isConnected: false,
        createdAt: clientData.createdAt,
        lastActivity: now,
        authData: clientData.authData,
        metadata: {
          isDisconnected: true,
          lastDisconnect: now.toISOString(),
        },
        connectedAt: now,
        owner: clientData.owner,
      });

      this.clients.set(sessionId, {
        ...clientData,
        isConnected: false,
        sock: null,
        qrData: null,
        lastActivity: now,
        connectedAt: now,
      });

      return true;
    } catch (error) {
      this.logger.error(`Logout error for ${sessionId}:`, error);
      return false;
    }
  }

  // Add a new method for session recovery
  async recoverSession(sessionId) {
    try {
      const authDir = path.join(this.authBaseDir, sessionId);
      const metaFile = path.join(authDir, "metadata.json");

      // Check if session exists in auth directory
      try {
        await fs.access(authDir);
      } catch {
        this.logger.warn(`No auth directory found for session ${sessionId}`);
        return false;
      }

      // Read metadata
      let metadata;
      try {
        metadata = JSON.parse(await fs.readFile(metaFile, "utf-8"));
      } catch (error) {
        this.logger.warn(`No metadata found for session ${sessionId}`);
        return false;
      }

      // Initialize WhatsApp with recovery mode
      await this.initWhatsApp(
        sessionId,
        metadata.numberId,
        true,
        metadata.owner || null
      );
      this.logger.info(`Session ${sessionId} recovered successfully`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to recover session ${sessionId}:`, error);
      return false;
    }
  }

  // ----------------------
  // Session Accessors
  // ----------------------
  getSessionByNumber(numberId) {
    const sessionId = this.numberToSessionMap.get(numberId);
    return sessionId ? this.clients.get(sessionId) : null;
  }

  getSessionById(sessionId) {
    return this.clients.get(sessionId);
  }

  getSessionStatus(sessionId) {
    const clientData = this.clients.get(sessionId);
    if (!clientData) {
      this.logger.warn(`No client data found for session ${sessionId}`);
      return null;
    }

    const status = {
      isConnected: clientData.isConnected,
      qrReady: !!clientData.qrData,
      numberId: clientData.numberId,
      lastActivity: clientData.lastActivity,
      connectionStatus: clientData.sock?.connectionStatus,
      reconnectAttempts: clientData.reconnectAttempts,
      maxReconnectAttempts: clientData.maxReconnectAttempts,
      connectedAt: clientData.connectedAt || null,
    };

    this.logger.debug(`Session status for ${sessionId}:`, status);
    return status;
  }

  async deleteSession(sessionId) {
    await this.db.deleteSession(sessionId);
    await this.deleteAuthFiles(sessionId);
    this.clients.delete(sessionId);
    this.logger.info(
      `Session ${sessionId} deleted from db, auth files, and memory.`
    );
  }
}

module.exports = WhatsAppManager;
