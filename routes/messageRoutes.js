const express = require('express');
const router = express.Router();

module.exports = (whatsappManager, validateSession) => {
  router.post('/send-message', validateSession, async (req, res) => {
    try {
      const { sessionId } = req;
      const { phoneNumber, message } = req.body;
      const clientData = whatsappManager.getSessionById(sessionId);
      if (!phoneNumber || !message) {
        return res.status(400).json({ status: 'error', message: 'Nomor telepon dan pesan harus diisi' });
      }
      const formattedNumber = whatsappManager.formatPhoneNumber(phoneNumber);
      const jid = `${formattedNumber}@s.whatsapp.net`;
      if (!clientData.sock) {
        return res.status(503).json({ status: 'error', message: 'WhatsApp belum terhubung' });
      }
      const sendMessage = await clientData.sock.sendMessage(jid, { text: message });
      res.json({ 
        status: 'success',
        data: {
          from: clientData.numberId,
          to: formattedNumber,
          messageId: sendMessage.key.id,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      whatsappManager.logger.error('Send message error:', error);
      res.status(500).json({ 
        status: 'error',
        message: error.message,
        note: 'Pastikan nomor dalam format benar (contoh: 0812xxx, +62812xxx, 62812xxx)'
      });
    }
  });

  router.post('/send-group-message', validateSession, async (req, res) => {
    try {
      const { sessionId } = req;
      const { groupId, message } = req.body;
      const clientData = whatsappManager.getSessionById(sessionId);
      if (!groupId || !message) {
        return res.status(400).json({ status: 'error', message: 'Group ID dan pesan harus diisi' });
      }
      if (!clientData.sock) {
        return res.status(503).json({ status: 'error', message: 'WhatsApp belum terhubung' });
      }
      const jid = groupId.endsWith('@g.us') ? groupId : `${groupId}@g.us`;
      const sendMessage = await clientData.sock.sendMessage(jid, { text: message });
      res.json({
        status: 'success',
        data: {
          from: clientData.numberId,
          groupId: jid,
          messageId: sendMessage.key.id,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      whatsappManager.logger.error('Send group message error:', error);
      res.status(500).json({
        status: 'error',
        message: error.message,
        note: 'Pastikan groupId valid, contoh: 123456789-123456789@g.us'
      });
    }
  });

  return router;
};
