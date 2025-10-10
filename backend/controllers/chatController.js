const Message = require('../models/Message');

// @desc    Get all messages for a room
// @route   GET /api/chat/:room
// @access  Private
const getMessages = async (req, res) => {
  try {
    const { room } = req.params;
    const limit = parseInt(req.query.limit) || 50;

    console.log('📥 GET MESSAGES REQUEST');
    console.log('Room:', room);
    console.log('Limit:', limit);

    const messages = await Message.find({ room })
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit);

    console.log(`✅ Found ${messages.length} messages`);

    res.json({
      success: true,
      count: messages.length,
      data: messages.reverse() // Return in chronological order
    });
  } catch (error) {
    console.log('❌ ERROR in Get Messages:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error fetching messages',
      error: error.message
    });
  }
};

// @desc    Delete a message
// @route   DELETE /api/chat/:id
// @access  Private
const deleteMessage = async (req, res) => {
  try {
    console.log('📥 DELETE MESSAGE REQUEST');
    console.log('Message ID:', req.params.id);
    console.log('User ID:', req.user.id);

    const message = await Message.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    // Check if user owns the message
    if (message.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this message'
      });
    }

    await message.deleteOne();

    console.log('✅ Message deleted successfully');

    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    console.log('❌ ERROR in Delete Message:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error deleting message',
      error: error.message
    });
  }
};

// @desc    Clear all messages in a room (Admin only)
// @route   DELETE /api/chat/room/:room
// @access  Private
const clearRoom = async (req, res) => {
  try {
    const { room } = req.params;

    console.log('📥 CLEAR ROOM REQUEST');
    console.log('Room:', room);

    const result = await Message.deleteMany({ room });

    console.log(`✅ Deleted ${result.deletedCount} messages`);

    res.json({
      success: true,
      message: `Cleared ${result.deletedCount} messages from room: ${room}`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.log('❌ ERROR in Clear Room:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error clearing room',
      error: error.message
    });
  }
};

module.exports = {
  getMessages,
  deleteMessage,
  clearRoom
};

