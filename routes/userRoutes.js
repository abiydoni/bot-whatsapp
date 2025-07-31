const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = (db) => {
  // Render users management page
  router.get('/users', async (req, res) => {
    if (!req.session.user || req.session.user.role !== 'admin') {
      return res.status(403).send('Forbidden: Admins only');
    }
    res.render('users', { user: req.session.user });
  });

  // Get all users (API endpoint)
  router.get('/api/users', async (req, res) => {
    try {
      const users = await db.getAllUsers();
      res.json({ status: 'success', users });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  // Delete user
  router.delete('/users/:username', async (req, res) => {
    try {
      const { username } = req.params;
      if (username === 'admin') {
        return res.status(400).json({ status: 'error', message: 'Cannot delete admin user' });
      }
      await db.deleteUser(username);
      res.json({ status: 'success', message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  // Reset user password
  router.post('/users/:username/reset-password', async (req, res) => {
    try {
      const { username } = req.params;
      const newPassword = Math.random().toString(36).slice(-8); // Generate random password
      const passwordHash = await bcrypt.hash(newPassword, 12);
      await db.updateUserPassword(username, passwordHash);
      res.json({ 
        status: 'success', 
        message: 'Password reset successfully',
        newPassword // Send the new password back to display to admin
      });
    } catch (error) {
      res.status(500).json({ status: 'error', message: error.message });
    }
  });

  return router;
}; 