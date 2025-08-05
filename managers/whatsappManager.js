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

        // Simpan metadata untuk session baru
        const metaFile = path.join(authDir, "metadata.json");
        const metadata = {
          numberId,
          ownerCompany,
          createdAt: new Date().toISOString(),
          sessionId,
        };
        await fs.writeFile(metaFile, JSON.stringify(metadata, null, 2));
        this.logger.info(`Metadata saved for session ${sessionId}`);
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
        markOnlineOnConnect: true, // Mark online untuk mencegah disconnect
        syncFullHistory: false,
        defaultQueryTimeoutMs: 0,
        keepAliveIntervalMs: 15000, // Lebih sering keep-alive
        connectTimeoutMs: 60000, // Timeout yang lebih lama
        retryRequestDelayMs: 2000,
        maxRetries: 5,
      });

      const clientData = {
        sock,
        qrData: null,
        isConnected: false,
        numberId,
        isRecovery,
        reconnectAttempts: 0,
        maxReconnectAttempts: 10, // Meningkatkan max attempts
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
        // Gunakan sessionId yang stabil untuk database
        const stableSessionId = this.generateStableSessionId(numberId);
        await this.db.saveSession(stableSessionId, {
          numberId,
          isConnected: false,
          createdAt: new Date(),
          lastActivity: null,
          authData: state,
          metadata: {
            isRecovery: false,
            originalSessionId: sessionId,
            stableSessionId: stableSessionId,
          },
          connectedAt: null,
          owner: owner || null,
          ownerCompany: ownerCompany || null,
        });

        // Update session mapping dengan sessionId yang stabil
        this.numberToSessionMap.set(numberId, stableSessionId);
        this.logger.info(
          `📝 Session mapping updated: ${numberId} -> ${stableSessionId}`
        );
      }

      this.setupSocketEvents(sock, sessionId, numberId, saveCreds);

      // Setup periodic health check untuk session ini
      this.setupHealthCheck(sessionId, numberId);

      // Setup periodic ping untuk menjaga session tetap aktif
      this.setupPeriodicPing(sessionId);

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

          // Simpan status session ke database dengan sessionId yang stabil
          const stableSessionId = this.generateStableSessionId(
            clientData.numberId
          );
          await this.db.saveSession(stableSessionId, {
            numberId: clientData.numberId,
            isConnected: true,
            createdAt: clientData.createdAt,
            lastActivity: new Date(),
            authData: clientData.authData,
            metadata: {
              isRecovery: clientData.isRecovery,
              lastConnected: new Date().toISOString(),
              reconnectAttempts: clientData.reconnectAttempts,
              stableSessionId: stableSessionId,
            },
            connectedAt: clientData.connectedAt,
            owner: clientData.owner,
          });

          // Update metadata file dengan status terbaru
          try {
            const metaFile = path.join(
              this.authBaseDir,
              sessionId,
              "metadata.json"
            );
            const existingMeta = await fs
              .readFile(metaFile, "utf-8")
              .catch(() => "{}");
            const metadata = JSON.parse(existingMeta);
            metadata.lastConnected = new Date().toISOString();
            metadata.isConnected = true;
            metadata.stableSessionId = stableSessionId;
            await fs.writeFile(metaFile, JSON.stringify(metadata, null, 2));
          } catch (error) {
            this.logger.warn(
              `Failed to update metadata for session ${sessionId}:`,
              error
            );
          }

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

          this.logger.warn(
            `🔴 Connection closed for ${sessionId} (${numberId}) - Attempting auto-recovery...`
          );

          // Simpan status disconnect dengan sessionId yang stabil
          const stableSessionId = this.generateStableSessionId(
            clientData.numberId
          );
          await this.db.saveSession(stableSessionId, {
            numberId: clientData.numberId,
            isConnected: false,
            createdAt: clientData.createdAt,
            lastActivity: new Date(),
            authData: clientData.authData,
            metadata: {
              isDisconnected: true,
              lastDisconnect: new Date().toISOString(),
              disconnectReason: lastDisconnect?.error?.output?.statusCode,
              stableSessionId: stableSessionId,
            },
            connectedAt: clientData.connectedAt,
            owner: clientData.owner,
          });

          if (shouldReconnect) {
            clientData.reconnectAttempts++;
            this.logger.info(
              `🔄 Scheduling reconnect for ${sessionId} (attempt ${clientData.reconnectAttempts})`
            );
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

    // Skip reconnect jika:
    // 1. User logout manual dari WhatsApp app
    // 2. Device dihapus dari WhatsApp
    // 3. Session dihapus manual dari aplikasi
    if (statusCode === DisconnectReason.loggedOut) {
      this.logger.warn(
        "User logged out manually from WhatsApp app, not attempting reconnect"
      );
      return false;
    }

    // Untuk semua error lain (network, server issues, dll), tetap coba reconnect
    this.logger.info(`Attempting reconnect for error code: ${statusCode}`);
    return true;
  }

  scheduleReconnect(sessionId, numberId, isRecovery, owner) {
    const clientData = this.clients.get(sessionId);

    // Reset reconnect attempts jika sudah berhasil connect sebelumnya
    if (clientData && clientData.isConnected) {
      clientData.reconnectAttempts = 0;
    }

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

    // Delay yang lebih pendek untuk reconnect yang lebih cepat
    const delay = Math.min(15000, clientData.reconnectAttempts * 3000);
    this.logger.warn(
      `🔄 Reconnecting ${sessionId} in ${delay}ms (attempt ${clientData.reconnectAttempts})`
    );

    setTimeout(async () => {
      try {
        // Pastikan menggunakan sessionId yang sama untuk reconnect
        const stableSessionId = this.generateStableSessionId(numberId);
        this.logger.info(
          `🔄 Using stable sessionId: ${stableSessionId} for ${numberId}`
        );

        await this.initWhatsApp(
          stableSessionId,
          numberId,
          isRecovery,
          clientData.owner,
          clientData.ownerCompany
        );
      } catch (error) {
        this.logger.error(`Reconnect error: ${error.message}`);
        if (clientData.reconnectAttempts < clientData.maxReconnectAttempts) {
          this.scheduleReconnect(
            sessionId,
            numberId,
            isRecovery,
            clientData.owner
          );
        }
      }
    }, delay);
  }

  // ----------------------
  // Health Check & Auto Recovery
  // ----------------------
  setupHealthCheck(sessionId, numberId) {
    // Health check setiap 2 menit untuk memastikan session tetap aktif
    const healthCheckInterval = setInterval(async () => {
      try {
        const clientData = this.clients.get(sessionId);
        if (!clientData) {
          clearInterval(healthCheckInterval);
          return;
        }

        // Jika session tidak connected, coba reconnect
        if (
          !clientData.isConnected &&
          clientData.reconnectAttempts < clientData.maxReconnectAttempts
        ) {
          // Cek apakah ada manual logout/delete
          try {
            const sessionData = await this.db.getSession(sessionId);
            if (
              sessionData?.metadata?.isManualLogout ||
              sessionData?.metadata?.isManualDelete
            ) {
              this.logger.info(
                `🛑 Health check: Session ${sessionId} was manually logged out/deleted, skipping recovery`
              );
              clearInterval(healthCheckInterval);
              return;
            }
          } catch (error) {
            this.logger.warn(
              `Failed to check session metadata for ${sessionId}:`,
              error
            );
          }

          this.logger.info(
            `🔄 Health check: Session ${sessionId} not connected, attempting recovery...`
          );
          clientData.reconnectAttempts++;

          // Gunakan sessionId yang stabil untuk recovery
          const stableSessionId = this.generateStableSessionId(numberId);
          this.logger.info(
            `🔄 Health check using stable sessionId: ${stableSessionId}`
          );

          await this.initWhatsApp(
            stableSessionId,
            numberId,
            true,
            clientData.owner,
            clientData.ownerCompany
          );
        } else if (clientData.isConnected) {
          // Reset reconnect attempts jika sudah connected
          clientData.reconnectAttempts = 0;
          this.logger.debug(`✅ Health check: Session ${sessionId} is healthy`);
        }
      } catch (error) {
        this.logger.error(
          `Health check error for session ${sessionId}:`,
          error
        );
      }
    }, 120000); // 2 menit

    // Simpan interval ID untuk cleanup nanti
    const clientData = this.clients.get(sessionId);
    if (clientData) {
      clientData.healthCheckInterval = healthCheckInterval;
    }
  }

  setupPeriodicPing(sessionId) {
    // Ping setiap 30 detik untuk menjaga session tetap aktif
    const pingInterval = setInterval(async () => {
      try {
        const clientData = this.clients.get(sessionId);
        if (!clientData || !clientData.isConnected || !clientData.sock) {
          clearInterval(pingInterval);
          return;
        }

        // Update last activity
        clientData.lastActivity = new Date();

        // Log ping untuk debugging
        this.logger.debug(`🏓 Ping sent for session ${sessionId}`);
      } catch (error) {
        this.logger.error(`Ping error for session ${sessionId}:`, error);
      }
    }, 30000); // 30 detik

    // Simpan interval ID untuk cleanup nanti
    const clientData = this.clients.get(sessionId);
    if (clientData) {
      clientData.pingInterval = pingInterval;
    }
  }

  // ----------------------
  // Session Management
  // ----------------------
  async recoverSessions() {
    try {
      const sessions = await this.db.getAllSessions();

      for (const session of sessions) {
        try {
          // Skip recovery jika ada manual logout/delete
          if (
            session.metadata?.isManualLogout ||
            session.metadata?.isManualDelete
          ) {
            this.logger.info(
              `🛑 Skipping recovery for manually logged out session: ${session.sessionId} (${session.numberId})`
            );
            continue;
          }

          // Gunakan sessionId yang stabil untuk recovery
          const stableSessionId = this.generateStableSessionId(
            session.numberId
          );
          this.logger.info(
            `Attempting to recover session: ${stableSessionId} (${session.numberId})`
          );
          await this.initWhatsApp(
            stableSessionId,
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
      // Cleanup intervals
      if (clientData.healthCheckInterval) {
        clearInterval(clientData.healthCheckInterval);
        this.logger.info(
          `Health check interval cleared for session ${sessionId}`
        );
      }

      if (clientData.pingInterval) {
        clearInterval(clientData.pingInterval);
        this.logger.info(`Ping interval cleared for session ${sessionId}`);
      }

      if (clientData.sock) {
        await clientData.sock.end();
        await clientData.sock.ws.close();
      }

      const now = new Date();

      // Generate new sessionId untuk memaksa QR scan ulang
      const newSessionId = this.generateSessionId();
      this.logger.info(
        `🔄 Manual logout: Generating new sessionId ${newSessionId} for ${clientData.numberId}`
      );

      // Simpan dengan sessionId baru untuk memaksa QR scan ulang
      await this.db.saveSession(newSessionId, {
        numberId: clientData.numberId,
        isConnected: false,
        createdAt: now,
        lastActivity: now,
        authData: null, // Reset auth data
        metadata: {
          isManualLogout: true,
          lastManualLogout: now.toISOString(),
          previousSessionId: sessionId,
          requiresNewQR: true,
        },
        connectedAt: null,
        owner: clientData.owner,
      });

      // Hapus session lama dari memory
      this.clients.delete(sessionId);

      // Hapus auth files lama
      await this.deleteAuthFiles(sessionId);

      // Update session mapping dengan sessionId baru
      if (clientData.numberId) {
        this.numberToSessionMap.set(clientData.numberId, newSessionId);
        this.logger.info(
          `📝 Session mapping updated after logout: ${clientData.numberId} -> ${newSessionId}`
        );
      }

      this.logger.info(
        `✅ Manual logout completed for ${sessionId} -> ${newSessionId}`
      );
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
    // Gunakan sessionId yang stabil untuk lookup
    const stableSessionId = this.generateStableSessionId(numberId);
    return this.clients.get(stableSessionId);
  }

  getStableSessionId(numberId) {
    return this.generateStableSessionId(numberId);
  }

  // Method untuk mendapatkan sessionId yang stabil (public)
  generateStableSessionId(numberId) {
    if (!numberId) {
      return this.generateSessionId();
    }
    // Gunakan hash dari numberId untuk sessionId yang konsisten
    return crypto.createHash("md5").update(numberId).digest("hex");
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
    try {
      const clientData = this.clients.get(sessionId);
      if (clientData) {
        // Cleanup health check interval
        if (clientData.healthCheckInterval) {
          clearInterval(clientData.healthCheckInterval);
          this.logger.info(
            `Health check interval cleared for session ${sessionId}`
          );
        }

        // Cleanup ping interval
        if (clientData.pingInterval) {
          clearInterval(clientData.pingInterval);
          this.logger.info(`Ping interval cleared for session ${sessionId}`);
        }

        if (clientData.sock) {
          clientData.sock.logout();
        }

        // Generate new sessionId untuk memaksa QR scan ulang
        const newSessionId = this.generateSessionId();
        this.logger.info(
          `🗑️ Manual delete: Generating new sessionId ${newSessionId} for ${clientData.numberId}`
        );

        // Simpan dengan sessionId baru untuk memaksa QR scan ulang
        await this.db.saveSession(newSessionId, {
          numberId: clientData.numberId,
          isConnected: false,
          createdAt: new Date(),
          lastActivity: new Date(),
          authData: null, // Reset auth data
          metadata: {
            isManualDelete: true,
            lastManualDelete: new Date().toISOString(),
            previousSessionId: sessionId,
            requiresNewQR: true,
          },
          connectedAt: null,
          owner: clientData.owner,
        });

        // Update session mapping dengan sessionId baru
        if (clientData.numberId) {
          this.numberToSessionMap.set(clientData.numberId, newSessionId);
          this.logger.info(
            `📝 Session mapping updated after delete: ${clientData.numberId} -> ${newSessionId}`
          );
        }
      }

      await this.db.deleteSession(sessionId);
      await this.deleteAuthFiles(sessionId);
      this.clients.delete(sessionId);
      this.logger.info(
        `Session ${sessionId} deleted and new sessionId ${newSessionId} created for QR scan.`
      );
      return true;
    } catch (error) {
      this.logger.error(`Error deleting session ${sessionId}:`, error);
      return false;
    }
  }
}

module.exports = WhatsAppManager;
