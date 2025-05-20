const {
  default: makeWASocket,
  useSingleFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const fs = require("fs");

// Lokasi file session
const SESSION_FILE_PATH = "./session.json";
const { state, saveState } = useSingleFileAuthState(SESSION_FILE_PATH);

async function startBot() {
  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`Using WA version ${version.join(".")}, is latest: ${isLatest}`);

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true,
  });

  // Simpan session setiap ada perubahan
  sock.ev.on("creds.update", saveState);

  // Respon ketika menerima pesan
  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const sender = msg.key.remoteJid;
    const text =
      msg.message.conversation || msg.message.extendedTextMessage?.text || "";

    if (text.toLowerCase() === "ping") {
      await sock.sendMessage(sender, { text: "pong" });
    }
  });

  // Logika reconnect jika koneksi terputus
  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error instanceof Boom &&
        lastDisconnect.error.output.statusCode !== DisconnectReason.loggedOut;

      console.log("Connection closed. Reconnecting:", shouldReconnect);

      if (shouldReconnect) {
        startBot(); // restart ulang
      } else {
        console.log("Logged out.");
      }
    } else if (connection === "open") {
      console.log("Connected to WhatsApp.");
    }
  });
}

startBot();
