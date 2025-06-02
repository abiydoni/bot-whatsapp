const express = require("express");
const qrcode = require("qrcode");
const axios = require("axios");
const fs = require("fs");
const http = require("http");
const socketIo = require("socket.io");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "*" } });

app.use(express.json());
const PORT = process.env.PORT || 8080;

let sock;
let qrData = null;
let isConnected = false;
let messageLogs = []; // Simpan log pesan

// SSE status endpoint
app.get("/status", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.write(`data: ${isConnected ? "connected" : "disconnected"}\n\n`);
});

// Mulai koneksi WhatsApp
async function startSocket() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({ version, auth: state });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on(
    "connection.update",
    async ({ connection, lastDisconnect, qr }) => {
      if (qr) {
        qrData = await qrcode.toDataURL(qr);
        console.log("QR Code diterima");
        isConnected = false;
        io.emit("qr", qrData);
      }

      if (connection === "close") {
        const shouldReconnect =
          lastDisconnect?.error instanceof Boom &&
          lastDisconnect.error.output?.statusCode !==
            DisconnectReason.loggedOut;
        if (shouldReconnect) {
          console.log("Koneksi terputus, mencoba reconnect...");
          startSocket();
        } else {
          console.log("Koneksi ditutup permanen.");
          isConnected = false;
          io.emit("status", "disconnected");
        }
      } else if (connection === "open") {
        console.log("✅ WhatsApp terhubung");
        qrData = null;
        isConnected = true;
        io.emit("status", "connected");
      }
    }
  );

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (!messages || type !== "notify") return;
    const msg = messages[0];
    const sender = msg.key.remoteJid;

    if (sender.endsWith("@g.us")) return; // Skip grup
    const text =
      msg.message?.conversation || msg.message?.extendedTextMessage?.text;
    if (!text) return;

    console.log("📩 Pesan masuk:", text);
    messageLogs.push({ from: sender, text, timestamp: new Date() });
    io.emit("newMessage", { from: sender, text, timestamp: new Date() });

    const lowerText = text.toLowerCase();
    if (lowerText === "menu") {
      await sock.sendMessage(sender, {
        text: "Silahkan pilih informasi:\n1. KK\n2. Jaga\n3. Jimpitan",
      });
    } else if (lowerText === "1") {
      try {
        const res = await axios.get(
          "https://botwa.appsbee.my.id/ambil_data_kk.php"
        );
        await sock.sendMessage(sender, { text: res.data });
      } catch {
        await sock.sendMessage(sender, { text: "⚠️ Gagal ambil data KK." });
      }
    } else if (lowerText === "2") {
      try {
        const res = await axios.get(
          "https://botwa.appsbee.my.id/ambil_data_jaga.php"
        );
        await sock.sendMessage(sender, { text: res.data });
      } catch {
        await sock.sendMessage(sender, { text: "⚠️ Gagal ambil data jaga." });
      }
    } else if (lowerText === "3") {
      try {
        const res = await axios.get(
          "https://botwa.appsbee.my.id/ambil_data_jimpitan.php"
        );
        await sock.sendMessage(sender, { text: res.data });
      } catch {
        await sock.sendMessage(sender, {
          text: "⚠️ Gagal ambil data jimpitan.",
        });
      }
    }
  });
}

// Endpoint menampilkan QR atau status koneksi
app.get("/qr", (req, res) => {
  if (isConnected) {
    return res.send(`<h2>✅ WhatsApp Terhubung!</h2>`);
  }
  if (!qrData) {
    return res.send(`<h2>QR belum tersedia atau sudah terhubung.</h2>`);
  }
  res.send(`<h2>🔍 Scan QR</h2><img src="${qrData}" />`);
});

// Endpoint log pesan masuk
app.get("/log", (req, res) => {
  res.send(`
    <html><body><h2>Log Pesan</h2>
    <ul>${messageLogs
      .map(
        (log) =>
          `<li>${log.timestamp.toLocaleString()}: ${log.from} - ${
            log.text
          }</li>`
      )
      .join("")}</ul>
    </body></html>`);
});

// Endpoint kirim pesan
app.post("/send-message", async (req, res) => {
  let { phoneNumber, message } = req.body;
  if (!phoneNumber || !message)
    return res.status(400).send("Nomor dan pesan harus diisi");
  phoneNumber = formatPhoneNumber(phoneNumber);
  try {
    const jid = `${phoneNumber}@s.whatsapp.net`;
    const result = await sock.sendMessage(jid, { text: message });
    messageLogs.push({
      from: "bot",
      text: `Kirim ke ${phoneNumber}: ${message}`,
      timestamp: new Date(),
    });
    res.send({ status: "success", result });
  } catch (e) {
    res.status(500).send("Gagal mengirim pesan");
  }
});

// Endpoint pairing code
app.post("/pairing", async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) return res.status(400).send("Nomor telepon harus diisi");
  try {
    const code = await sock.requestPairingCode(phoneNumber);
    res.send({ code });
  } catch (e) {
    res.status(500).send("Gagal pairing");
  }
});

// Endpoint logout/reset koneksi
app.post("/logout", async (req, res) => {
  try {
    if (sock) {
      await sock.logout();
      sock = null;
    }
    fs.rmSync("./auth", { recursive: true, force: true });
    isConnected = false;
    messageLogs = [];
    res.send("✅ Berhasil logout dan reset koneksi.");
  } catch (e) {
    res.status(500).send("Gagal logout");
  }
});

// Fungsi format nomor
function formatPhoneNumber(phoneNumber) {
  return phoneNumber.startsWith("0")
    ? "62" + phoneNumber.slice(1)
    : phoneNumber;
}

// Jalankan server & socket
startSocket();
server.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
