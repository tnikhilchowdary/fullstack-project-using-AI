const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      console.log('🔐 AUTH MIDDLEWARE - Checking token...');
      
      // Get token from header
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      console.log('✅ Token verified for user ID:', decoded.id);

      // Get user from token
      req.user = await User.findById(decoded.id).select('-password');
      console.log('✅ User authenticated:', req.user.email);

      next();
    } catch (error) {
      console.log('❌ AUTH FAILED - Invalid token:', error.message);
      res.status(401).json({
        success: false,
        message: 'Not authorized, token failed'
      });
    }
  }

  if (!token) {
    console.log('❌ AUTH FAILED - No token provided');
    res.status(401).json({
      success: false,
      message: 'Not authorized, no token'
    });
  }
};

module.exports = { protect };

