const express = require('express');
const router = express.Router();

module.exports = (whatsappManager, validateSession) => {
    router.get('/status', validateSession, (req, res) => { 
        const { sessionId } = req;
        const clientData = whatsappManager.getSessionById(sessionId);

        if (!clientData) {
            return res.status(404).json({ status: 'error', message: 'Session not found' });
        }

        // Set headers for SSE
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('X-Accel-Buffering', 'no'); // Disable nginx buffering

        // Send initial status
        const status = whatsappManager.getSessionStatus(sessionId);
        res.write(`data: ${JSON.stringify(status)}\n\n`);

        // Store client for updates
        const clientId = Date.now();
        if (!clientData.clients) clientData.clients = [];
        clientData.clients.push({ id: clientId, res });

        // Send heartbeat every 30 seconds to keep connection alive
        const heartbeatInterval = setInterval(() => {
            if (!res.writableEnded) {
            res.write(': heartbeat\n\n');
            }
        }, 30000);

        // Send status updates when connection changes
        const sendStatusUpdate = (newStatus) => {
            if (!res.writableEnded) {
            res.write(`data: ${JSON.stringify(newStatus)}\n\n`);
            }
        };

        // Listen for connection updates
        const connectionUpdateHandler = (update) => {
            if (update.connection === 'open' || update.connection === 'close') {
            const newStatus = whatsappManager.getSessionStatus(sessionId);
            sendStatusUpdate(newStatus);
            }
        };

        // Add event listener
        clientData.sock.ev.on('connection.update', connectionUpdateHandler);

        // Remove client on disconnect
        req.on('close', () => {
            clearInterval(heartbeatInterval);
            if (clientData.clients) {
            clientData.clients = clientData.clients.filter(c => c.id !== clientId);
            }
            // Remove event listener safely
            try {
            if (clientData.sock && clientData.sock.ev) {
                clientData.sock.ev.off('connection.update', connectionUpdateHandler);
            }
            } catch (error) {
            whatsappManager.logger.error('Error removing event listener:', error);
            }
        });
    });

    router.get('/sessions', async (req, res) => {
        try {
          const user = req.session && req.session.user;
          let sessions = Array.from(whatsappManager.clients.entries()).map(([sessionId, data]) => ({
            sessionId,
            numberId: data.numberId,
            isConnected: data.isConnected,
            isRecovery: data.isRecovery,
            reconnectAttempts: data.reconnectAttempts,
            createdAt: data.createdAt,
            lastActivity: data.lastActivity,
            connectedAt: data.connectedAt || null,
            owner: data.owner || null,
            ownerCompany: data.ownerCompany || null
          }));
          if (!user || user.role !== 'admin') {
            sessions = sessions.filter(s => s.owner === user.username);
          }
          res.json({ 
            status: 'success',
            count: sessions.length,
            sessions 
          });
        } catch (error) {
          whatsappManager.logger.error('Failed to get sessions:', error);
          res.status(500).json({ 
            status: 'error',
            message: error.message 
          });
        }
      });

    router.post('/sessions', (req, res, next) => {
      next();
    }, async (req, res) => { 
        try {
            const { numberId } = req.body;
            const user = req.session && req.session.user;
            if (!numberId) {
            return res.status(400).json({ 
                status: 'error',
                message: 'Number ID is required' 
            });
            }
            if (!/^\d+$/.test(numberId)) {
              return res.status(400).json({
                status: 'error',
                message: 'Number ID must be numeric.'
              });
            }
            if (user && user.role !== 'admin') {
              const userSession = Array.from(whatsappManager.clients.entries()).find(
                ([, data]) => data.owner === user.username
              );
              if (userSession) {
                return res.status(400).json({
                  status: 'error',
                  message: 'You can only add one WhatsApp number.'
                });
              }
            }
        
            if (whatsappManager.numberToSessionMap.has(numberId)) {
            const existingSessionId = whatsappManager.numberToSessionMap.get(numberId);
            const existingSession = whatsappManager.clients.get(existingSessionId);
            
            if (existingSession) {
                return res.redirect(`/qr?sessionId=${existingSessionId}&numberId=${numberId}`);
            } else {
                whatsappManager.numberToSessionMap.delete(numberId);
            }
            }
        
            const sessionId = whatsappManager.generateSessionId();
            // Get user's company from database
            const userData = await whatsappManager.db.getUserByUsername(user.username);
            await whatsappManager.initWhatsApp(sessionId, numberId, false, user ? user.username : null, userData.company);
            
            return res.redirect(`/qr?sessionId=${sessionId}&numberId=${numberId}`);
        } catch (error) {
            whatsappManager.logger.error('Create session error:', error);
            res.status(500).json({ 
            status: 'error',
            message: error.message 
            });
        }
    });

    router.delete('/sessions/:sessionId', async (req, res) => {
      const { sessionId } = req.params;
      try {
        // Ambil data session sebelum dihapus
        const session = whatsappManager.clients.get(sessionId);
        const numberId = session ? session.numberId : null;

        await whatsappManager.deleteSession(sessionId);

        res.json({
          status: 'success',
          message: numberId
            ? `${numberId} deleted!`
            : `Session deleted`
        });
      } catch (error) {
        whatsappManager.logger.error('Delete session error:', error);
        res.status(500).json({
          status: 'error',
          message: error.message
        });
      }
    });
    
  return router;
};