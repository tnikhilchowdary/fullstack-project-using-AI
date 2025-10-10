const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log('\n' + '='.repeat(60));
  console.log(`🌐 ${req.method} ${req.url}`);
  console.log('Time:', new Date().toLocaleString());
  if (req.method === 'POST' || req.method === 'PUT') {
    console.log('Request Body:', req.body);
  }
  console.log('='.repeat(60));
  next();
});

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected Successfully!');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Connect to Database
connectDB();

// Import Routes
const todoRoutes = require('./routes/todoRoutes');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Test Route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to MERN Todo API with Authentication!', 
    status: 'Server is running successfully',
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected',
    endpoints: {
      'Auth': {
        'POST /api/auth/register': 'Register new user',
        'POST /api/auth/login': 'Login user',
        'GET /api/auth/profile': 'Get user profile (Protected)'
      },
      'Todos': {
        'GET /api/todos': 'Get all todos (Protected)',
        'GET /api/todos/:id': 'Get single todo (Protected)',
        'POST /api/todos': 'Create new todo (Protected)',
        'PUT /api/todos/:id': 'Update todo (Protected)',
        'DELETE /api/todos/:id': 'Delete todo (Protected)'
      }
    }
  });
});

// Test route to check database connection
app.get('/api/test', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const statusMap = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };
  
  res.json({
    message: 'Database Connection Test',
    status: statusMap[dbStatus],
    database: process.env.MONGODB_URI ? 'URI Configured' : 'URI Not Configured'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/admin', adminRoutes);

// Error handling for mongoose connection
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

const PORT = process.env.PORT || 5000;

// Create HTTP server for Socket.io
const http = require('http');
const server = http.createServer(app);

// Socket.io setup
const { Server } = require('socket.io');
const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true
  }
});

const Message = require('./models/Message');

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('👤 User connected:', socket.id);

  // Join a room (default: general)
  socket.on('join_room', (room) => {
    socket.join(room);
    console.log(`👥 User ${socket.id} joined room: ${room}`);
  });

  // Listen for new messages
  socket.on('send_message', async (data) => {
    try {
      console.log('📨 New message:', data);
      
      // Save message to database
      const message = await Message.create({
        user: data.userId,
        username: data.username,
        message: data.message,
        room: data.room || 'general'
      });

      // Populate user info
      await message.populate('user', 'name email');

      // Broadcast message to room
      io.to(data.room || 'general').emit('receive_message', {
        _id: message._id,
        username: data.username,
        message: data.message,
        room: message.room,
        createdAt: message.createdAt,
        user: message.user
      });

      console.log('✅ Message saved and broadcasted');
    } catch (error) {
      console.error('❌ Error sending message:', error);
      socket.emit('message_error', { error: error.message });
    }
  });

  // User typing indicator
  socket.on('typing', (data) => {
    socket.to(data.room || 'general').emit('user_typing', {
      username: data.username
    });
  });

  socket.on('stop_typing', (data) => {
    socket.to(data.room || 'general').emit('user_stop_typing', {
      username: data.username
    });
  });

  socket.on('disconnect', () => {
    console.log('👋 User disconnected:', socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`💬 Socket.io is ready for real-time chat`);
});

