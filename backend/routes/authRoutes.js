const express = require('express');
const router = express.Router();
const { register, login, getProfile, updateTheme } = require('../controllers/authController');
const { protect } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);

// Private routes
router.get('/profile', protect, getProfile);
router.put('/theme', protect, updateTheme);

module.exports = router;

