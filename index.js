const {
  default: makeWASocket,
  useSingleFileAuthState,
} = require("@whiskeysockets/baileys");
const axios = require("axios");
const { Boom } = require("@hapi/boom");
const fs = require("fs");
const path = require("path");

const authFile = "./session.json";
const { state, saveState } = useSingleFileAuthState(authFile);

async function startBot() {
  const sock = makeWASocket({
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveState);

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;

    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return;

    const nomor = msg.key.remoteJid.split("@")[0];
    const teksPesan =
      msg.message.conversation ||
      msg.message.extendedTextMessage?.text ||
      msg.message.imageMessage?.caption ||
      "";

    console.log(`📥 Pesan dari ${nomor}: ${teksPesan}`);

    try {
      await axios.post("http://localhost/balas_otomatis.php", {
        pengirim: nomor,
        pesan: teksPesan,
      });
    } catch (err) {
      console.error("❌ Gagal kirim ke PHP:", err.message);
    }
  });
}

startBot();
