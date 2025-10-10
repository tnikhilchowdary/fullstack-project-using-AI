const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'your-secret-key', {
    expiresIn: '30d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    console.log('📥 REGISTER REQUEST RECEIVED:');
    console.log('Body:', req.body);
    
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      console.log('❌ Validation Failed - Missing fields');
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      console.log('❌ User already exists:', email);
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      console.log('✅ User registered successfully:', user.email);
      console.log('📤 RESPONSE SENT:', { _id: user._id, name: user.name, email: user.email });
      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          theme: user.theme,
          isAdmin: user.isAdmin || false,
          token: generateToken(user._id)
        }
      });
    }
  } catch (error) {
    console.log('❌ ERROR in Register:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error registering user',
      error: error.message
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    console.log('📥 LOGIN REQUEST RECEIVED:');
    console.log('Body:', req.body);
    
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      console.log('❌ Validation Failed - Missing email or password');
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password'
      });
    }

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      console.log('❌ Invalid password for user:', email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    console.log('✅ Login successful for user:', user.email);
    console.log('📤 RESPONSE SENT:', { _id: user._id, name: user.name, email: user.email });
    
    res.json({
      success: true,
      message: 'Login successful',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        theme: user.theme,
        isAdmin: user.isAdmin || false,
        token: generateToken(user._id)
      }
    });
  } catch (error) {
    console.log('❌ ERROR in Login:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
// @access  Private
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    res.json({
      success: true,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message
    });
  }
};

// @desc    Update user theme preference
// @route   PUT /api/auth/theme
// @access  Private
const updateTheme = async (req, res) => {
  try {
    console.log('📥 UPDATE THEME REQUEST');
    console.log('User ID:', req.user.id);
    console.log('Theme:', req.body.theme);
    
    const { theme } = req.body;
    
    if (!theme || !['light', 'dark'].includes(theme)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid theme value. Must be "light" or "dark"'
      });
    }
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { theme },
      { new: true }
    ).select('-password');
    
    console.log('✅ Theme updated successfully:', theme);
    
    res.json({
      success: true,
      message: 'Theme updated successfully',
      data: user
    });
  } catch (error) {
    console.log('❌ ERROR in Update Theme:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error updating theme',
      error: error.message
    });
  }
};

module.exports = {
  register,
  login,
  getProfile,
  updateTheme
};

