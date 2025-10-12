const express = require('express');
const router = express.Router();
const { getMessages, deleteMessage, clearRoom } = require('../controllers/chatController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.get('/:room', protect, getMessages);
router.delete('/message/:id', protect, deleteMessage);
router.delete('/room/:room', protect, clearRoom);

module.exports = router;




