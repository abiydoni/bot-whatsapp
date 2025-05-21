import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/webhook", async (req, res) => {
  try {
    const { from, message } = req.body;

    console.log(`Pesan diterima dari ${from}: ${message}`);

    const response = await fetch("https://wapi.appsbee.my.id/send-message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        phone: from,
        message: `Pesan Anda sudah kami terima: ${message}`,
      }),
    });

    const data = await response.json();
    console.log("Response dari API:", data);

    res.status(200).json({ status: "Pesan diproses" });
  } catch (err) {
    console.error("Gagal memproses pesan:", err.message);
    res.status(500).json({ error: "Terjadi kesalahan saat memproses pesan" });
  }
});

app.listen(PORT, () => {
  console.log(`Bot WhatsApp aktif di http://localhost:${PORT}`);
});
