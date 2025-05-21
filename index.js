const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Webhook endpoint untuk terima pesan dari WAPI
app.post("/webhook", async (req, res) => {
  const message = req.body.message;
  const sender = req.body.sender;

  console.log(`Pesan diterima dari ${sender}: ${message}`);

  // Kirim balasan ke nomor pengirim
  try {
    await axios.post("https://wapi.appsbee.my.id/send-message", {
      number: sender,
      message: `Balasan otomatis: ${message}`,
    });
    console.log("Balasan terkirim");
  } catch (error) {
    console.error("Gagal kirim balasan:", error.message);
  }

  res.sendStatus(200);
});

app.listen(PORT, () => {
  console.log(`Bot WhatsApp aktif di http://localhost:${PORT}`);
});
