const express = require('express');
const router = express.Router();

module.exports = (whatsappManager, validateSession) => {
  router.post('/disconnect', validateSession, async (req, res) => {
    try {
      const { sessionId } = req;
      const clientData = whatsappManager.getSessionById(sessionId);
      if (!clientData) {
        return res.status(404).json({ status: 'error', message: 'Session not found' });
      }
      if (clientData.sock) {
        try {
          await clientData.sock.logout();
          await clientData.sock.end();
          if (clientData.sock.ws && clientData.sock.ws.readyState !== clientData.sock.ws.CLOSED) {
            clientData.sock.ws.close();
          }
        } catch (sockError) {
          whatsappManager.logger.warn('Error closing socket:', sockError);
        }
      }
      const authCleared = await whatsappManager.deleteAuthFiles(sessionId);
      if (!authCleared) {
        whatsappManager.logger.warn(`Auth files not fully cleared for session ${sessionId}`);
      }
      whatsappManager.clients.delete(sessionId);
      if (clientData.sock && clientData.sock.ev) {
        clientData.sock.ev.removeAllListeners();
      }
      whatsappManager.logger.info(`Successfully disconnected session ${sessionId}`);
      res.json({ 
        status: 'success',
        message: 'Disconnected successfully',
        details: {
          sessionId,
          numberId: clientData.numberId,
          authCleared,
          timestamp: new Date().toISOString()
        }
      });
    } catch (error) {
      whatsappManager.logger.error('Disconnect Error:', error);
      res.status(500).json({ 
        status: 'error', 
        message: 'Failed to disconnect',
        error: {
          name: error.name,
          message: error.message,
          stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }
      });
    }
  });

  return router;
};
