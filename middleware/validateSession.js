module.exports = (whatsappManager) => (req, res, next) => {
  const sessionId = req.headers['x-session-id'] || req.query.sessionId;
  if (!sessionId) return res.status(400).json({ status: 'error', message: 'Session ID is required' });
  if (!whatsappManager.getSessionById(sessionId)) return res.status(404).json({ status: 'error', message: 'Session not found' });
  req.sessionId = sessionId;
  next();
};