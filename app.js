require("dotenv").config();
const express = require("express");
const sendReply = require("./sendReply");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/incoming", async (req, res) => {
  const { phone, message } = req.body;
  console.log(`📩 Pesan masuk dari ${phone}: ${message}`);

  const result = await sendReply(
    phone,
    `Pesan kamu "${message}" sudah kami terima!`
  );
  if (result) {
    res.status(200).json({ status: "ok", result });
  } else {
    res.status(500).json({ error: "Gagal kirim balasan" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Bot WhatsApp aktif di http://localhost:${PORT}`);
});
