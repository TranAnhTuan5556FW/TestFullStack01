const passport = require('passport');
const { check } = require('express-validator');

exports.authenticate = passport.authenticate('jwt', { session: false });

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden' });
    }

    next();
  };
};

exports.validateRegistration = [
  check('email').isEmail().withMessage('Please enter a valid email'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  check('firstName').notEmpty().withMessage('First name is required'),
  check('lastName').notEmpty().withMessage('Last name is required'),
  check('phoneNumber')
    .matches(/^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/)
    .withMessage('Please enter a valid Vietnamese phone number'),
  check('dateOfBirth')
    .isISO8601()
    .withMessage('Please enter a valid date')
];
// backend/auth-service/src/middleware/auth.js

// Thêm middleware kiểm tra admin registration key
exports.validateAdminKey = (req, res, next) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== process.env.ADMIN_REGISTRATION_KEY) {
    return res.status(403).json({ message: 'Invalid admin registration key' });
  }
  next();
};