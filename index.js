const venom = require('venom-bot');
const axios = require('axios');

venom
  .create({
    session: 'session-name',
    multidevice: true
  })
  .then(client => start(client))
  .catch(err => console.error(err));

function start(client) {
  console.log('✅ Bot WhatsApp aktif');

  client.onMessage(async message => {
    const nomor = message.from;
    const pesan = message.body;

    if (message.isGroupMsg === false) {
      try {
        await axios.get('https://botwa.appsbee.my.id/auto_reply.php', {
          params: {
            nomor,
            pesan
          }
        });
        console.log(`✅ Auto-reply terkirim ke ${nomor}`);
      } catch (err) {
        console.error(`❌ Gagal reply ke ${nomor}:`, err.message);
      }
    }
  });
}
