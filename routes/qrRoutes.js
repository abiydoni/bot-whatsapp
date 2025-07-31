const express = require('express');
const router = express.Router();

module.exports = (whatsappManager) => {
  // Require login middleware
  function requireLogin(req, res, next) {
    if (req.session && req.session.user) return next();
    res.redirect('/login');
  }

  router.get('/', requireLogin, (req, res) => {
    res.render('index', { user: req.session.user });
  });

  router.get('/qr', requireLogin, async (req, res) => {
    try {
      const { sessionId, numberId } = req.query;
      if (!sessionId && !numberId) {
        return res.status(400).send('Session ID or Number ID is required');
      }

      if (sessionId) {
        const clientData = whatsappManager.getSessionById(sessionId);
        if (!clientData) return res.status(404).send('Session not found');
        if (clientData.isConnected) {
          const baseUrl = 'https://' + req.get('host');
          return res.render('connected', { baseUrl, qrData: null, sessionId, numberId: clientData.numberId, isConnected: true, user: req.session.user });
        }
        if (!clientData.qrData) {
          return res.send(`
            <!DOCTYPE html>
            <html>
              <head>
                <title>Loading QR</title>
                <style>
                  body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
                  .loader {
                    border: 5px solid #f3f3f3;
                    border-top: 5px solid #25D366;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    animation: spin 1s linear infinite;
                    margin: 20px auto;
                  }
                  @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                  }
                </style>
              </head>
              <body>
                <h2>Preparing QR Code...</h2>
                <div class="loader"></div>
                <script>setTimeout(() => location.reload(), 2000)</script>
              </body>
            </html>
          `);
        }
        return res.render('qr', { 
          qrData: clientData.qrData, 
          sessionId,
          numberId: clientData.numberId,
          isConnected: false,
          user: req.session.user
        });
      }

      if (numberId) {
        if (whatsappManager.numberToSessionMap.has(numberId)) {
          const existingSessionId = whatsappManager.numberToSessionMap.get(numberId);
          const existingSession = whatsappManager.clients.get(existingSessionId);
          if (existingSession) return res.redirect(`/qr?sessionId=${existingSessionId}`);
        }
        const newSessionId = whatsappManager.generateSessionId();
        await whatsappManager.initWhatsApp(newSessionId, numberId);
        return res.redirect(`/qr?sessionId=${newSessionId}`);
      }
    } catch (error) {
      whatsappManager.logger.error('QR endpoint error:', error);
      res.status(500).send('Internal server error');
    }
  });

  return router;
};
