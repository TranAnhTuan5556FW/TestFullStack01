const express = require('express');
const passport = require('passport');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticate, authorize, validateRegistration, validateAdminKey } = require('../middleware/auth');
const User = require('../models/User');
const { generateToken } = require('../utils/tokenUtils');

// Local auth routes
router.post('/register', validateRegistration, authController.register);
router.post('/login', authController.login);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: '/login' }),
  authController.googleCallback
);

// Facebook OAuth routes
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);
router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/login' }),
  authController.facebookCallback
);

// Protected routes
router.get('/profile', authenticate, authController.getProfile);
router.put('/profile', authenticate, authController.updateProfile);

// Admin routes
router.get('/admin/users', 
  authenticate, 
  authorize('admin'), 
  async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

// Thêm route đăng ký admin
router.post('/register/admin', 
  validateAdminKey,
  validateRegistration, 
  async (req, res) => {
    try {
      const { email, password, firstName, lastName, phoneNumber, dateOfBirth } = req.body;

      // Kiểm tra email đã tồn tại
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Tạo admin user
      const user = await User.create({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        role: 'admin',
        provider: 'local',
        isVerified: true
      });

      const token = generateToken(user);

      res.status(201).json({
        message: 'Admin registered successfully',
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Admin registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
);

module.exports = router; 