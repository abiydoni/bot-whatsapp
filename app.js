const express = require("express");
const qrcode = require("qrcode");
const fs = require("fs");
const {
  default: makeWASocket,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
} = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 8080;

let sock;
let qrData = null;
let isConnected = false;

// SSE Status koneksi real-time
app.get("/status", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  const interval = setInterval(() => {
    res.write(`data: ${isConnected ? "connected" : "disconnected"}\n\n`);
  }, 2000);

  req.on("close", () => clearInterval(interval));
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
      }
      if (connection === "close") {
        const shouldReconnect =
          lastDisconnect?.error instanceof Boom &&
          lastDisconnect.error.output?.statusCode !==
            DisconnectReason.loggedOut;
        console.log(
          shouldReconnect ? "Mencoba reconnect..." : "Koneksi ditutup."
        );
        if (shouldReconnect) startSocket();
      } else if (connection === "open") {
        console.log("✅ WhatsApp terhubung");
        qrData = null;
        isConnected = true;
      }
    }
  );

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (!messages || type !== "notify") return;
    const msg = messages[0];
    const sender = msg.key.remoteJid;
    if (sender.endsWith("@g.us")) return;

    const text =
      msg.message?.conversation || msg.message?.extendedTextMessage?.text;
    if (!text) return;

    console.log(`📩 Pesan dari ${sender}: ${text}`);
    const lowerText = text.toLowerCase();
    let reply = null;

    if (lowerText === "menu") {
      reply =
        "Pilih informasi:\n1. Data KK\n2. Daftar Jaga\n3. Laporan Jimpitan";
    } else if (lowerText === "1") {
      reply = "🔗 Data KK akan dikirim melalui link API.";
    } else if (lowerText === "2") {
      reply = "🔗 Daftar Jaga akan dikirim melalui link API.";
    } else if (lowerText === "3") {
      reply = "🔗 Laporan Jimpitan akan dikirim melalui link API.";
    } else {
      reply =
        "✅ Pesan Anda sudah diterima, kami akan membalas secepatnya atau ketik *menu* untuk masuk pilihan informasi!";
    }

    if (reply) {
      await sock.sendMessage(sender, { text: reply });
    }
  });
}

// Endpoint QR & UI
app.get("/qr", (req, res) => {
  res.send(`
    <html>
      <body style="font-family: sans-serif; text-align: center;">
        <h2>📱 WhatsApp Status</h2>
        <div id="status">Memuat status...</div>
        <div id="qr"></div>
        <button onclick="unregister()">❌ Hapus QR & Sesi</button>
        <script>
          const statusDiv = document.getElementById('status');
          const qrDiv = document.getElementById('qr');
          const eventSource = new EventSource('/status');
          eventSource.onmessage = e => {
            statusDiv.innerHTML = e.data === 'connected' ? '✅ Terhubung' : '❌ Tidak terhubung';
            if(e.data !== 'connected'){
              fetch('/get-qr').then(r => r.text()).then(html => qrDiv.innerHTML = html);
            } else {
              qrDiv.innerHTML = '';
            }
          };
          function unregister(){
            fetch('/unregister', { method: 'POST' }).then(() => alert('✅ Sesi dihapus. Silakan refresh untuk scan ulang QR.'));
          }
        </script>
      </body>
    </html>
  `);
});

// Endpoint untuk menampilkan QR
app.get("/get-qr", (req, res) => {
  if (!qrData) {
    res.send("Belum ada QR Code, tunggu sebentar...");
  } else {
    res.send(
      `<img src="${qrData}" width="300" /><br/>Scan untuk login WhatsApp`
    );
  }
});

// Endpoint untuk hapus sesi (unregister)
app.post("/unregister", async (req, res) => {
  try {
    if (fs.existsSync("./auth")) {
      fs.rmSync("./auth", { recursive: true, force: true });
    }
    res.send("Sesi WhatsApp berhasil dihapus");
    process.exit(0); // Restart server agar sesi direset
  } catch (err) {
    res.status(500).send("Gagal hapus sesi: " + err.message);
  }
});

// Halaman utama
app.get("/", (req, res) => {
  res.redirect("/qr");
});

// Jalankan server & socket
startSocket();
app.listen(PORT, () => console.log(`🚀 Server di http://localhost:${PORT}`));
