const makeWASocket = require("@whiskeysockets/baileys").default;
const {
  useSingleFileAuthState,
} = require("@whiskeysockets/baileys/lib/utils/auth");
const axios = require("axios");
const fs = require("fs");

const { state, saveState } = useSingleFileAuthState("./session.json");

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveState);

  sock.ev.on("messages.upsert", async ({ messages }) => {
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const nomor = msg.key.remoteJid.split("@")[0];
    const teks = msg.message?.conversation || "";

    console.log(`Pesan dari ${nomor}: ${teks}`);

    try {
      await axios.post("https://botwa.appsbee.my.id/balas_otomatis.php", {
        pengirim: nomor,
        pesan: teks,
      });
    } catch (err) {
      console.error("Gagal kirim ke server PHP:", err.message);
    }
  });
}

startBot().catch((err) => console.error("❌ Error di startBot:", err));
