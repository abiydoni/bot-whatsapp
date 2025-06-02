const express = require("express");
const qrcode = require("qrcode");
const axios = require("axios");
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

// Fungsi format nomor telepon
function formatPhoneNumber(phoneNumber) {
  if (phoneNumber.startsWith("0")) {
    return "62" + phoneNumber.slice(1);
  }
  return phoneNumber;
}

// Simpan log ke file
function logMessage(type, sender, message) {
  const log = `[${new Date().toLocaleString()}] [${type}] ${sender}: ${message}\n`;
  fs.appendFileSync("messages.log", log);
}

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
    logMessage("IN", sender, text);

    const lowerText = text.toLowerCase();
    let reply = null;

    if (lowerText === "menu") {
      reply =
        "Pilih informasi:\n1. Data KK\n2. Daftar Jaga\n3. Laporan Jimpitan";
    } else if (lowerText === "1") {
      try {
        const res = await axios.get(
          "https://rt07.appsbee.my.id/api/ambil_kk.php"
        );
        reply = res.data;
      } catch (err) {
        reply = "⚠️ Gagal mengambil data KK.";
      }
    } else if (lowerText === "2") {
      try {
        const res = await axios.get(
          "https://rt07.appsbee.my.id/api/ambil_jaga.php"
        );
        reply = res.data;
      } catch (err) {
        reply = "⚠️ Gagal mengambil data jaga.";
      }
    } else if (lowerText === "3") {
      try {
        const res = await axios.get(
          "https://rt07.appsbee.my.id/api/ambil_jimpitan.php"
        );
        reply = res.data;
      } catch (err) {
        reply = "⚠️ Gagal mengambil data jimpitan.";
      }
    } else {
      reply = "✅ Pesan Anda sudah diterima, kami akan membalas secepatnya.";
    }

    if (reply) {
      await sock.sendMessage(sender, { text: reply });
      logMessage("OUT", sender, reply);
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
        <hr/>
        <h3>Kirim Pesan</h3>
        <input id="phone" placeholder="Nomor HP" /><br/>
        <textarea id="msg" placeholder="Pesan"></textarea><br/>
        <button onclick="send()">Kirim</button>
        <script>
          const statusDiv = document.getElementById('status');
          const qrDiv = document.getElementById('qr');
          const eventSource = new EventSource('/status');
          eventSource.onmessage = e => {
            statusDiv.innerHTML = e.data === 'connected' ? '✅ Terhubung' : '❌ Tidak terhubung';
            if(e.data !== 'connected'){
              fetch('/qr').then(r => r.text()).then(html => qrDiv.innerHTML = html);
            } else {
              qrDiv.innerHTML = '';
            }
          };
          function send(){
            fetch('/send-message', {
              method:'POST',
              headers:{'Content-Type':'application/json'},
              body:JSON.stringify({phoneNumber:document.getElementById('phone').value,message:document.getElementById('msg').value})
            }).then(r=>r.text()).then(alert);
          }
        </script>
      </body>
    </html>
  `);
});

// Endpoint pairing code
app.post("/pairing", async (req, res) => {
  const { phoneNumber } = req.body;
  if (!phoneNumber) return res.status(400).send("Nomor telepon harus diisi");
  try {
    const code = await sock.requestPairingCode(phoneNumber);
    res.send({ code });
  } catch (err) {
    res.status(500).send("Gagal pairing: " + err.message);
  }
});

// Endpoint kirim pesan
app.post("/send-message", async (req, res) => {
  let { phoneNumber, message } = req.body;
  if (!phoneNumber || !message)
    return res.status(400).send("Nomor & pesan harus diisi");
  phoneNumber = formatPhoneNumber(phoneNumber);
  try {
    const sendResult = await sock.sendMessage(`${phoneNumber}@s.whatsapp.net`, {
      text: message,
    });
    logMessage("OUT", phoneNumber, message);
    res.send({ status: "success", message: "Terkirim", data: sendResult });
  } catch (err) {
    res.status(500).send("Gagal kirim: " + err.message);
  }
});

// Halaman utama
app.get("/", (req, res) => {
  res.redirect("/qr");
});

// Mulai server & socket
startSocket();
app.listen(PORT, () => console.log(`🚀 Server di http://localhost:${PORT}`));
