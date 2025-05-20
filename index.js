const {
  default: makeWASocket,
  useMultiFileAuthState,
  fetchLatestBaileysVersion,
  DisconnectReason,
} = require("@whiskeysockets/baileys");
const { Boom } = require("@hapi/boom");
const fs = require("fs");

async function startBot() {
  const { state, saveCreds } = await useMultiFileAuthState(
    "./auth_info_baileys"
  );

  const { version, isLatest } = await fetchLatestBaileysVersion();
  console.log(`using WA version: ${version}, isLatest: ${isLatest}`);

  const sock = makeWASocket({
    version,
    auth: state,
    printQRInTerminal: true,
  });

  sock.ev.on("creds.update", saveCreds);

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect =
        (lastDisconnect.error = new Boom(lastDisconnect?.error))?.output
          ?.statusCode !== DisconnectReason.loggedOut;
      console.log(
        "connection closed due to ",
        lastDisconnect.error,
        ", reconnecting:",
        shouldReconnect
      );
      if (shouldReconnect) {
        startBot();
      }
    } else if (connection === "open") {
      console.log("connected to WhatsApp");
    }
  });

  sock.ev.on("messages.upsert", async (m) => {
    console.log(JSON.stringify(m, undefined, 2));

    const msg = m.messages[0];
    if (!msg.key.fromMe && m.type === "notify") {
      await sock.sendMessage(msg.key.remoteJid, {
        text: "Hai, ini bot Doni Abiy!",
      });
    }
  });
}

startBot();
