const express = require('express');
const router = express.Router();

module.exports = (whatsappManager, validateSession) => {
  router.get('/groups', validateSession, async (req, res) => {
    try {
      const { sessionId } = req;
      const clientData = whatsappManager.getSessionById(sessionId);
      if (!clientData.sock) return res.status(503).json({ message: 'WhatsApp belum terhubung' });
      const groups = await clientData.sock.groupFetchAllParticipating();
      const groupList = Object.values(groups).map(g => ({
        id: g.id?.toString?.() || g.id,
        name: g.subject
      }));
      res.json({ status: 'success', groups: groupList });
    } catch (error) {
      whatsappManager.logger.error('Fetch group error:', error);
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  router.get('/groups-view', (req, res) => {
    res.sendFile(require('path').join(__dirname, '../public/groups.html'));
  });

  return router;
};
