const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  username: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: [true, 'Message content is required'],
    trim: true
  },
  room: {
    type: String,
    default: 'general' // Default room for team chat
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);

