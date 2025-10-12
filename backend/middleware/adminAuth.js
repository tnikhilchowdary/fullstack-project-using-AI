const User = require('../models/User');

// Middleware to check if user is admin
const adminOnly = async (req, res, next) => {
  try {
    // User should already be authenticated by protect middleware
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authenticated'
      });
    }

    // Fetch user to check admin status
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    if (!user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.'
      });
    }

    // User is admin, proceed
    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error verifying admin status',
      error: error.message
    });
  }
};

module.exports = { adminOnly };




