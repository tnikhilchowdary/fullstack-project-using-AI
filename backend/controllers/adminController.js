const User = require('../models/User');
const Todo = require('../models/Todo');
const Message = require('../models/Message');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    console.log('👑 ADMIN: Get All Users');
    
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    
    console.log(`✅ Found ${users.length} users`);
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.log('❌ ERROR in Get All Users:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching users',
      error: error.message
    });
  }
};

// @desc    Get all todos from all users
// @route   GET /api/admin/todos
// @access  Private/Admin
const getAllTodos = async (req, res) => {
  try {
    console.log('👑 ADMIN: Get All Todos');
    
    const todos = await Todo.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    console.log(`✅ Found ${todos.length} todos`);
    
    res.json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    console.log('❌ ERROR in Get All Todos:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message
    });
  }
};

// @desc    Get all messages
// @route   GET /api/admin/messages
// @access  Private/Admin
const getAllMessages = async (req, res) => {
  try {
    console.log('👑 ADMIN: Get All Messages');
    
    const messages = await Message.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    
    console.log(`✅ Found ${messages.length} messages`);
    
    res.json({
      success: true,
      count: messages.length,
      data: messages
    });
  } catch (error) {
    console.log('❌ ERROR in Get All Messages:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message
    });
  }
};

// @desc    Get system statistics
// @route   GET /api/admin/stats
// @access  Private/Admin
const getSystemStats = async (req, res) => {
  try {
    console.log('👑 ADMIN: Get System Stats');
    
    const totalUsers = await User.countDocuments();
    const totalTodos = await Todo.countDocuments();
    const completedTodos = await Todo.countDocuments({ completed: true });
    const pendingTodos = await Todo.countDocuments({ completed: false });
    const totalMessages = await Message.countDocuments();
    
    // Priority breakdown
    const highPriority = await Todo.countDocuments({ priority: 'high' });
    const mediumPriority = await Todo.countDocuments({ priority: 'medium' });
    const lowPriority = await Todo.countDocuments({ priority: 'low' });
    
    // Recent activity
    const recentUsers = await User.find().sort({ createdAt: -1 }).limit(5).select('-password');
    const recentTodos = await Todo.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(10);
    const recentMessages = await Message.find().populate('user', 'name email').sort({ createdAt: -1 }).limit(10);
    
    const stats = {
      overview: {
        totalUsers,
        totalTodos,
        completedTodos,
        pendingTodos,
        totalMessages,
        completionRate: totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0
      },
      priorities: {
        high: highPriority,
        medium: mediumPriority,
        low: lowPriority
      },
      recentActivity: {
        users: recentUsers,
        todos: recentTodos,
        messages: recentMessages
      }
    };
    
    console.log('✅ Stats calculated successfully');
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.log('❌ ERROR in Get System Stats:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching system stats',
      error: error.message
    });
  }
};

// @desc    Delete a user
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    console.log('👑 ADMIN: Delete User:', req.params.id);
    
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Don't allow deleting admin
    if (user.isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'Cannot delete admin user'
      });
    }
    
    // Delete user's todos
    await Todo.deleteMany({ user: req.params.id });
    
    // Delete user
    await user.deleteOne();
    
    console.log('✅ User and related data deleted');
    
    res.json({
      success: true,
      message: 'User deleted successfully'
    });
  } catch (error) {
    console.log('❌ ERROR in Delete User:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error.message
    });
  }
};

module.exports = {
  getAllUsers,
  getAllTodos,
  getAllMessages,
  getSystemStats,
  deleteUser
};




