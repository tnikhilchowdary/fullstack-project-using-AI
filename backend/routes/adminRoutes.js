const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getAllTodos,
  getAllMessages,
  getSystemStats,
  deleteUser
} = require('../controllers/adminController');
const { protect } = require('../middleware/auth');
const { adminOnly } = require('../middleware/adminAuth');

// All routes require authentication and admin privileges
router.use(protect);
router.use(adminOnly);

// Admin routes
router.get('/users', getAllUsers);
router.get('/todos', getAllTodos);
router.get('/messages', getAllMessages);
router.get('/stats', getSystemStats);
router.delete('/users/:id', deleteUser);

module.exports = router;




