import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/webhook", async (req, res) => {
  const { from, message } = req.body;

  console.log(`Pesan masuk dari ${from}: ${message}`);

  // Jawaban otomatis (bisa pakai AI/logika lain di sini)
  const reply = "Halo! Ini balasan otomatis dari bot.";

  // Kirim ke wapi.appsbee.my.id/send-message via PHP (sender.php)
  try {
    await axios.post("https://botwa.appsbee.my.id/sender.php", {
      to: from,
      message: reply,
    });
    res.send("OK");
  } catch (err) {
    console.error("Gagal mengirim balasan:", err.message);
    res.status(500).send("Gagal");
  }
});

app.listen(port, () => {
  console.log(`Bot WhatsApp aktif di http://localhost:${port}`);
});
