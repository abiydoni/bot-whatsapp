const express = require('express');
const router = express.Router();

module.exports = (whatsappManager, validateSession) => {
  router.get('/connection-time', validateSession, (req, res) => {
    const session = whatsappManager.getSessionById(req.sessionId);
    res.json({
      status: 'success',
      connectedAt: session.connectedAt || session.createdAt || null,
      lastActivity: session.lastActivity || null,
      isConnected: session.isConnected || false
    });
  });

  return router;
};
