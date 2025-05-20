const { Client } = require("whatsapp-web.js");
const qrcode = require("qrcode-terminal");
const axios = require("axios");

const client = new Client();

client.on("qr", (qr) => {
  console.log("📲 Scan QR berikut untuk login:");
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log("✅ Bot WhatsApp sudah siap dan online.");
});

client.on("message", async (msg) => {
  const nomor = msg.from.split("@")[0];
  const pesan = msg.body;

  if (!pesan) return;

  try {
    // Kirim ke endpoint auto-reply PHP
    await axios.get("https://botwa.appsbee.my.id/auto_reply.php", {
      params: { nomor, pesan },
    });

    console.log(`✅ Auto-reply terkirim ke ${nomor} (pesan: ${pesan})`);
  } catch (error) {
    console.error(`❌ Gagal auto-reply ke ${nomor}:`, error.message);
  }
});

client.initialize();
