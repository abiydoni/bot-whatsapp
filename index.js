import makeWASocket from "@whiskeysockets/baileys";
import { useSingleFileAuthState } from "@whiskeysockets/baileys";
import mysql from "mysql2/promise";
import P from "pino";

const SESSION_FILE_PATH = "./session.json";

// Setup auth state
const { state, saveState } = useSingleFileAuthState(SESSION_FILE_PATH);

// Buat koneksi MySQL pool (ganti config sesuai DB kamu)
const pool = mysql.createPool({
  host: "localhost",
  user: "appsbeem_admin",
  password: "A7by777__",
  database: "appsbeem_jimpitan",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Fungsi buat jalankan query data master_kk
async function getMasterData() {
  try {
    const [rows] = await pool.query(
      "SELECT code_id, kk_name FROM master_kk LIMIT 10"
    );
    return rows;
  } catch (error) {
    console.error("DB error:", error);
    return [];
  }
}

async function startBot() {
  const sock = makeWASocket({
    logger: P({ level: "silent" }),
    printQRInTerminal: true,
    auth: state,
  });

  sock.ev.on("creds.update", saveState);

  sock.ev.on("messages.upsert", async ({ messages, type }) => {
    if (type !== "notify") return;
    const msg = messages[0];
    if (!msg.message || msg.key.fromMe) return; // skip jika pesan sendiri

    const from = msg.key.remoteJid;
    const text =
      msg.message.conversation || msg.message?.extendedTextMessage?.text || "";
    const pesan = text.trim().toLowerCase();

    console.log(`Pesan masuk dari ${from}: ${pesan}`);

    let balasan =
      "Maaf, perintah tidak dikenali. Ketik *cek data* untuk melihat informasi.";

    if (pesan === "cek data") {
      const data = await getMasterData();
      if (data.length > 0) {
        balasan = "📊 *Data Terkini:*\n";
        data.forEach((row, i) => {
          balasan += `${i + 1}. ${row.code_id} - ${row.kk_name}\n`;
        });
      } else {
        balasan = "Tidak ada data yang tersedia.";
      }
    }

    // Kirim balasan
    await sock.sendMessage(from, { text: balasan });
  });

  sock.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      if (lastDisconnect?.error?.output?.statusCode !== 401) {
        console.log("Reconnect...");
        startBot();
      } else {
        console.log("Koneksi terputus, logout diperlukan.");
      }
    }
    if (connection === "open") {
      console.log("Koneksi berhasil, bot siap digunakan");
    }
  });
}

startBot();
