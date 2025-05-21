import express from "express";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  const data = req.body;

  if (!data || !data.sender || !data.message) {
    return res.status(400).json({ error: "Data tidak lengkap" });
  }

  const phoneNumber = data.sender;
  const message = data.message;

  console.log(`Pesan diterima dari ${phoneNumber}: ${message}`);

  // Pesan balasan
  const reply = `Halo! Kami menerima pesan Anda: "${message}"`;

  try {
    await axios.post(
      "https://wapi.appsbee.my.id/send-message",
      {
        phoneNumber,
        message: reply,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-session-id": "91e37fbd895dedf2587d3f506ce1718e", // disesuaikan
        },
      }
    );

    console.log(`Balasan dikirim ke ${phoneNumber}`);
    res.sendStatus(200);
  } catch (err) {
    console.error("Gagal mengirim balasan:", err.message);
    res.sendStatus(500);
  }
});

app.listen(PORT, () => {
  console.log(`Bot WhatsApp aktif di http://localhost:${PORT}`);
});
