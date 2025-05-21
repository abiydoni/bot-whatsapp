import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

// Middleware untuk parsing JSON
app.use(express.json());

// Endpoint untuk menerima pesan masuk dari webhook
app.post("/webhook", async (req, res) => {
  try {
    const { from, message } = req.body;

    console.log(`Pesan diterima dari ${from}: ${message}`);

    // Kirim balasan melalui API eksternal
    await axios.post("https://wapi.appsbee.my.id/send-message", {
      phone: from,
      message: `Pesan Anda sudah kami terima: ${message}`,
    });

    res.status(200).json({ status: "Pesan diproses" });
  } catch (err) {
    console.error("Gagal memproses pesan:", err.message);
    res.status(500).json({ error: "Terjadi kesalahan saat memproses pesan" });
  }
});

// Jalankan server
app.listen(PORT, () => {
  console.log(`Bot WhatsApp aktif di http://localhost:${PORT}`);
});
