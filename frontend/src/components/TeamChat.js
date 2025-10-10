import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import io from 'socket.io-client';
import axios from 'axios';
import '../styles/TeamChat.css';

const SOCKET_URL = 'http://localhost:5000';
const ROOM = 'general'; // Default team chat room

function TeamChat() {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize socket connection
  useEffect(() => {
    if (!user) return;

    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to chat server');
      setIsConnected(true);
      newSocket.emit('join_room', ROOM);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from chat server');
      setIsConnected(false);
    });

    newSocket.on('receive_message', (data) => {
      console.log('📨 Received message:', data);
      setMessages((prev) => [...prev, data]);
    });

    newSocket.on('user_typing', (data) => {
      if (data.username !== user.name) {
        setTypingUser(data.username);
        setIsTyping(true);
      }
    });

    newSocket.on('user_stop_typing', () => {
      setIsTyping(false);
      setTypingUser(null);
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  // Fetch message history
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`/api/chat/${ROOM}`);
        setMessages(response.data.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    if (user) {
      fetchMessages();
    }
  }, [user]);

  // Handle sending message
  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !socket || !user) return;

    const messageData = {
      userId: user._id,
      username: user.name,
      message: newMessage.trim(),
      room: ROOM
    };

    socket.emit('send_message', messageData);
    setNewMessage('');
    
    // Stop typing indicator
    socket.emit('stop_typing', { username: user.name, room: ROOM });
  };

  // Handle typing indicator
  const handleTyping = () => {
    if (!socket || !user) return;

    socket.emit('typing', { username: user.name, room: ROOM });

    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout to stop typing indicator
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('stop_typing', { username: user.name, room: ROOM });
    }, 1000);
  };

  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="team-chat-container">
      <div className="chat-header">
        <div className="chat-title">
          <span className="chat-icon">💬</span>
          <h3>Team Chat</h3>
        </div>
        <div className="chat-status">
          <span className={`status-indicator ${isConnected ? 'connected' : 'disconnected'}`}></span>
          <span className="status-text">{isConnected ? 'Online' : 'Offline'}</span>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <div className="no-messages">
            <p>👋 Start the conversation!</p>
            <p className="hint">Send a message to your team</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <div
              key={msg._id || index}
              className={`message ${msg.username === user.name ? 'own-message' : 'other-message'}`}
            >
              <div className="message-header">
                <span className="message-username">{msg.username}</span>
                <span className="message-time">{formatTime(msg.createdAt)}</span>
              </div>
              <div className="message-content">{msg.message}</div>
            </div>
          ))
        )}
        {isTyping && typingUser && (
          <div className="typing-indicator">
            <span>{typingUser} is typing</span>
            <span className="typing-dots">
              <span>.</span><span>.</span><span>.</span>
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form className="chat-input-container" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
            handleTyping();
          }}
          placeholder="Type a message..."
          className="chat-input"
          disabled={!isConnected}
        />
        <button 
          type="submit" 
          className="send-button"
          disabled={!newMessage.trim() || !isConnected}
        >
          <span className="send-icon">📤</span>
        </button>
      </form>
    </div>
  );
}

export default TeamChat;

