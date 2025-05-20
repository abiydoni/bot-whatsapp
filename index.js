import express from 'express';
import makeWASocket, { useSingleFileAuthState, fetchLatestBaileysVersion, DisconnectReason } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
import { unlinkSync } from 'node:fs';

const SESSION_FILE_PATH = './session.json';
const { state, saveState } = useSingleFileAuthState(SESSION_FILE_PATH);
const PORT = 3000;
const VALID_SESSION_ID = '91e37fbd895dedf2587d3f506ce1718e'; // dari dokumen

async function startSock() {
  const { version } = await fetchLatestBaileysVersion();
  const sock = makeWASocket({
    version,
    printQRInTerminal: true,
    auth: state,
  });

  sock.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      console.log('Connection closed, reconnecting?', shouldReconnect);
      if (shouldReconnect) {
        startSock();
      } else {
        console.log('Logged out, removing session file');
        try {
          unlinkSync(SESSION_FILE_PATH);
        } catch {}
      }
    } else if (connection === 'open') {
      console.log('Connected to WhatsApp!');
    }
  });

  sock.ev.on('creds.update', saveState);
  return sock;
}

async function main() {
  const sock = await startSock();

  const app = express();
  app.use(express.json());

  // Endpoint POST /send-message sesuai dokumen
  app.post('/send-message', async (req, res) => {
    const sessionId = req.headers['x-session-id'];
    if (sessionId !== VALID_SESSION_ID) {
      return res.status(401).json({ error: 'Invalid session ID' });
    }

    const { phoneNumber, message } = req.body;
    if (!phoneNumber || !message) {
      return res.status(400).json({ error: 'phoneNumber dan message wajib diisi' });
    }

    try {
      const jid = phoneNumber.includes('@s.whatsapp.net') ? phoneNumber : (phoneNumber.startsWith('0') ? `62${phoneNumber.slice(1)}@s.whatsapp.net` : `${phoneNumber}@s.whatsapp.net`);
      await sock.sendMessage(jid, { text: message });
      return res.json({ status: 'success', message: `Pesan terkirim ke ${phoneNumber}` });
    } catch (error) {
      console.error('Gagal mengirim pesan:', error);
      return res.status(500).json({ status: 'fail', error: error.toString() });
    }
  });

  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}

main().catch(console.error);
