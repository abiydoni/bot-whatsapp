const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = (whatsappManager, db) => {
  // AUTH MIDDLEWARE
  function requireLogin(req, res, next) {
    if (req.session && req.session.user) return next();
    res.redirect('/login');
  }

  function requireAdmin(req, res, next) {
    if (req.session && req.session.user && req.session.user.role === 'admin') return next();
    res.status(403).send('Forbidden: Admins only');
  }

  // LOGIN ROUTES
  router.get('/login', (req, res) => {
    if (req.session && req.session.user) return res.redirect('/');
    res.render('login', { error: null });
  });

  router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.getUserByUsername(username);
    if (user && await bcrypt.compare(password, user.passwordHash)) {
      req.session.user = { 
        username, 
        role: user.role,
        company: user.company 
      };
      return res.redirect('/');
    }
    res.render('login', { error: 'Invalid username or password' });
  });

  // REGISTER ROUTES (admin only)
  router.get('/register', requireLogin, requireAdmin, (req, res) => {
    res.render('register', { error: null, user: req.session.user });
  });

  router.post('/register', requireLogin, requireAdmin, async (req, res) => {
    const { username, password, confirmPassword, role, company } = req.body;
    if (!username || !password || !confirmPassword || !role || !company) {
      return res.render('register', { error: 'All fields are required', user: req.session.user });
    }
    if (password !== confirmPassword) {
      return res.render('register', { error: 'Passwords do not match', user: req.session.user });
    }
    if (await db.getUserByUsername(username)) {
      return res.render('register', { error: 'Username already exists', user: req.session.user });
    }
    const passwordHash = await bcrypt.hash(password, 12);
    await db.createUser(username, passwordHash, role, company);
    res.redirect('/');
  });

  router.get('/logout', (req, res) => {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  });

  // CHANGE PASSWORD ROUTES
  router.get('/changepassword', requireLogin, (req, res) => {
    res.render('changepassword', { error: null, success: null, user: req.session.user });
  });

  router.post('/changepassword', requireLogin, async (req, res) => {
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const user = await db.getUserByUsername(req.session.user.username);
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.render('changepassword', { error: 'All fields are required', success: null, user: req.session.user });
    }
    if (!(user && await bcrypt.compare(oldPassword, user.passwordHash))) {
      return res.render('changepassword', { error: 'Old password is incorrect', success: null, user: req.session.user });
    }
    if (newPassword !== confirmNewPassword) {
      return res.render('changepassword', { error: 'New passwords do not match', success: null, user: req.session.user });
    }
    if (oldPassword === newPassword) {
      return res.render('changepassword', { error: 'New password must be different from old password', success: null, user: req.session.user });
    }
    const newPasswordHash = await bcrypt.hash(newPassword, 12);
    await db.updateUserPassword(user.username, newPasswordHash);
    res.render('changepassword', { error: null, success: 'Password changed successfully', user: req.session.user });
  });

  // Export middleware for use in app.js
  router.requireLogin = requireLogin;
  router.requireAdmin = requireAdmin;

  return router;
}; 