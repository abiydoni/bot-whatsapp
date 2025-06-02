const express = require("express");
const qrcode = require("qrcode");
const axios = require("axios"); // ✅ Tambahkan ini
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

// SSE endpoint — hanya dideklarasikan sekali
app.get("/status", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.setHeader("Access-Control-Allow-Origin", "*");

  res.write(`data: ${isConnected ? "connected" : "disconnected"}\n\n`);
});

// Fungsi untuk memulai koneksi WhatsApp
async function startSocket() {
  const { state, saveCreds } = await useMultiFileAuthState("./auth");
  const { version } = await fetchLatestBaileysVersion();

  sock = makeWASocket({
    version,
    auth: { creds: state.creds, keys: state.keys },
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", async (update) => {
    const { connection, lastDisconnect, qr } = update;

    if (qr) {
      qrData = await qrcode.toDataURL(qr);
      console.log("QR Code diterima");
      isConnected = false;
    }

    if (connection === "close") {
      const shouldReconnect =
        lastDisconnect?.error instanceof Boom &&
        lastDisconnect.error.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) {
        console.log("Koneksi terputus, mencoba reconnect...");
        startSocket();
      } else {
        console.log("Koneksi ditutup secara permanen.");
      }
    } else if (connection === "open") {
      console.log("✅ WhatsApp terhubung");
      qrData = null;
      isConnected = true;
    }
  });

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (!messages || type !== "notify") return;

    const msg = messages[0];
    const sender = msg.key.remoteJid;

    // Cek apakah ini pesan grup
    if (sender.endsWith("@g.us")) {
      // Jangan balas jika pesan dari grup
      console.log("Pesan dari grup, dilewati.");
      return;
    }

    // Lanjutkan proses pesan pribadi
    const text =
      msg.message?.conversation || msg.message?.extendedTextMessage?.text;
    if (!text) return;

    const lowerText = text.toLowerCase();

    console.log("📩 Pesan masuk:", text);

    if (lowerText === "menu") {
      await sock.sendMessage(sender, {
        text:
          "Silahkan pilih informasi yang anda inginkan!\n" +
          "1. Informasi Data Kepala Keluarga\n" +
          "2. Informasi Daftar Jaga\n" +
          "3. Laporan Jimpitan (semalam)",
      });
    } else if (lowerText === "1") {
      try {
        const response = await axios.get(
          "https://botwa.appsbee.my.id/ambil_data_kk.php"
        );
        await sock.sendMessage(sender, { text: response.data });
      } catch (error) {
        console.error("❌ Gagal ambil data KK:", error.message);
        await sock.sendMessage(sender, {
          text: "⚠️ Gagal mengambil data kepala keluarga. Coba lagi nanti ya.",
        });
      }
    } else if (lowerText === "2") {
      try {
        const response = await axios.get(
          "https://botwa.appsbee.my.id/ambil_data_jaga.php"
        );
        await sock.sendMessage(sender, { text: response.data });
      } catch (error) {
        console.error("❌ Gagal ambil data KK:", error.message);
        await sock.sendMessage(sender, {
          text: "⚠️ Gagal mengambil data kepala keluarga. Coba lagi nanti ya.",
        });
      }
    } else if (lowerText === "3") {
      try {
        const response = await axios.get(
          "https://botwa.appsbee.my.id/ambil_data_jimpitan.php"
        );
        await sock.sendMessage(sender, { text: response.data });
      } catch (error) {
        console.error("❌ Gagal ambil data jimpitan:", error.message);
        await sock.sendMessage(sender, {
          text: "⚠️ Gagal mengambil data jimpitan. Coba lagi nanti ya.",
        });
      }
    }
  });
}

// Tampilkan QR Code atau status koneksi
app.get("/qr", (req, res) => {
  if (isConnected) {
    return res.send(`
      <html>
        <body style="text-align: center; font-family: sans-serif;">
          <h2>✅ WhatsApp Terhubung!</h2>
          <p>WhatsApp telah berhasil terhubung. Sekarang Anda dapat mengirim pesan.</p>
          <script>
            const eventSource = new EventSource('/status');
            eventSource.onmessage = function(event) {
              if (event.data === 'connected') {
                document.body.innerHTML = "<h2>✅ WhatsApp Terhubung!</h2><p>Siap digunakan!</p>";
              } else {
                document.body.innerHTML = "<h2>❌ Belum Terhubung</h2>";
              }
            };
          </script>
        </body>
      </html>
    `);
  }

  if (!qrData) {
    return res.send("<h2>QR belum tersedia atau sudah terhubung.</h2>");
  }

  res.send(`
    <html>
      <body style="text-align: center; font-family: sans-serif;">
        <h2>🔍 Scan QR WhatsApp</h2>
        <img src="${qrData}" />
        <p>Scan dengan WhatsApp pada perangkat kamu</p>
      </body>
    </html>
  `);
});

// Endpoint untuk mengirim pesan
app.post("/send-message", async (req, res) => {
  let { phoneNumber, message } = req.body;

  if (!phoneNumber || !message) {
    return res.status(400).send("Nomor telepon dan pesan harus diisi");
  }

  phoneNumber = formatPhoneNumber(phoneNumber);

  try {
    const jid = `${phoneNumber}@s.whatsapp.net`;
    const sendMessage = await sock.sendMessage(jid, { text: message });
    console.log(`✅ Pesan terkirim ke ${phoneNumber}`);
    res.send({
      status: "success",
      message: "Pesan berhasil dikirim",
      data: sendMessage,
    });
  } catch (error) {
    console.error("❌ Gagal kirim pesan:", error.message);
    res.status(500).send("Gagal mengirim pesan");
  }
});

// Endpoint pairing code
app.post("/pairing", async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).send("Nomor telepon harus diisi");
  }

  try {
    const code = await sock.requestPairingCode(phoneNumber);
    console.log(`📲 Pairing code: ${code}`);
    res.send({ code });
  } catch (error) {
    console.error("❌ Gagal pairing:", error.message);
    res.status(500).send("Gagal meminta pairing code");
  }
});

// Halaman utama
app.get("/", (req, res) => {
  res.send(`
    <html>
      <body style="text-align: center; font-family: sans-serif;">
        <h1>📱 WhatsApp API Bot</h1>
        <p>Gunakan <a href="/qr">QR</a> atau pairing untuk memulai.</p>
      </body>
    </html>
  `);
});

// Fungsi bantu format nomor
function formatPhoneNumber(phoneNumber) {
  if (phoneNumber.startsWith("0")) {
    return "62" + phoneNumber.slice(1);
  }
  return phoneNumber;
}

// Jalankan socket & server
startSocket();
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
