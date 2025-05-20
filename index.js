const { Client } = require('whatsapp-web.js');
const axios = require('axios');

const client = new Client();

client.on('qr', qr => {
  const qrcode = require('qrcode-terminal');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ Bot WA siap');
});

client.on('message', async msg => {
  const nomor = msg.from.split('@')[0];
  const pesan = msg.body;

  try {
    await axios.get('https://botwa.appsbee.my.id/auto_reply.php', {
      params: {
        nomor: nomor,
        pesan: pesan
      }
    });

    console.log(`Auto-reply terkirim ke ${nomor}`);
  } catch (error) {
    console.error('❌ Gagal auto-reply:', error.message);
  }
});

client.initialize();
