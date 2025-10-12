import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AdminDashboard.css';

// Use environment variable for API URL in production
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Check if user is admin
    if (!user?.isAdmin) {
      navigate('/dashboard');
      return;
    }

    fetchAdminData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, navigate]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, todosRes, messagesRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admin/stats`),
        axios.get(`${API_BASE_URL}/api/admin/users`),
        axios.get(`${API_BASE_URL}/api/admin/todos`),
        axios.get(`${API_BASE_URL}/api/admin/messages`)
      ]);

      setStats(statsRes.data.data);
      setUsers(usersRes.data.data);
      setTodos(todosRes.data.data);
      setMessages(messagesRes.data.data);
    } catch (error) {
      console.error('Error fetching admin data:', error);
      if (error.response?.status === 403) {
        alert('Access denied. Admin privileges required.');
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This will also delete all their tasks.')) {
      return;
    }

    try {
      await axios.delete(`${API_BASE_URL}/api/admin/users/${userId}`);
      alert('User deleted successfully');
      fetchAdminData();
    } catch (error) {
      console.error('Error deleting user:', error);
      alert(error.response?.data?.message || 'Error deleting user');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <div className="admin-loading">Loading Admin Dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>👑 Admin Dashboard</h1>
        <p>Complete system overview and management</p>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          📊 Overview
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          👥 Users ({users.length})
        </button>
        <button
          className={activeTab === 'todos' ? 'active' : ''}
          onClick={() => setActiveTab('todos')}
        >
          ✅ All Tasks ({todos.length})
        </button>
        <button
          className={activeTab === 'messages' ? 'active' : ''}
          onClick={() => setActiveTab('messages')}
        >
          💬 Messages ({messages.length})
        </button>
      </div>

      {activeTab === 'overview' && stats && (
        <div className="overview-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">👥</div>
              <div className="stat-info">
                <h3>Total Users</h3>
                <p className="stat-number">{stats.overview.totalUsers}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-info">
                <h3>Total Tasks</h3>
                <p className="stat-number">{stats.overview.totalTodos}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <h3>Completed</h3>
                <p className="stat-number">{stats.overview.completedTodos}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⏳</div>
              <div className="stat-info">
                <h3>Pending</h3>
                <p className="stat-number">{stats.overview.pendingTodos}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">💬</div>
              <div className="stat-info">
                <h3>Messages</h3>
                <p className="stat-number">{stats.overview.totalMessages}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📈</div>
              <div className="stat-info">
                <h3>Completion Rate</h3>
                <p className="stat-number">{stats.overview.completionRate}%</p>
              </div>
            </div>
          </div>

          <div className="priority-overview">
            <h2>Priority Distribution</h2>
            <div className="priority-bars">
              <div className="priority-item">
                <span className="priority-label">🔴 High Priority</span>
                <div className="priority-bar-container">
                  <div
                    className="priority-bar high"
                    style={{
                      width: `${(stats.priorities.high / stats.overview.totalTodos) * 100 || 0}%`
                    }}
                  ></div>
                  <span className="priority-count">{stats.priorities.high}</span>
                </div>
              </div>

              <div className="priority-item">
                <span className="priority-label">🟡 Medium Priority</span>
                <div className="priority-bar-container">
                  <div
                    className="priority-bar medium"
                    style={{
                      width: `${(stats.priorities.medium / stats.overview.totalTodos) * 100 || 0}%`
                    }}
                  ></div>
                  <span className="priority-count">{stats.priorities.medium}</span>
                </div>
              </div>

              <div className="priority-item">
                <span className="priority-label">🟢 Low Priority</span>
                <div className="priority-bar-container">
                  <div
                    className="priority-bar low"
                    style={{
                      width: `${(stats.priorities.low / stats.overview.totalTodos) * 100 || 0}%`
                    }}
                  ></div>
                  <span className="priority-count">{stats.priorities.low}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="recent-activity">
            <h2>Recent Activity</h2>
            <div className="activity-grid">
              <div className="activity-card">
                <h3>Recent Users</h3>
                {stats.recentActivity.users.map(user => (
                  <div key={user._id} className="activity-item">
                    <span className="activity-icon">👤</span>
                    <div>
                      <p className="activity-title">{user.name}</p>
                      <p className="activity-subtitle">{user.email}</p>
                    </div>
                    <span className="activity-time">{formatDate(user.createdAt)}</span>
                  </div>
                ))}
              </div>

              <div className="activity-card">
                <h3>Recent Tasks</h3>
                {stats.recentActivity.todos.slice(0, 5).map(todo => (
                  <div key={todo._id} className="activity-item">
                    <span className={`activity-icon ${todo.completed ? 'completed' : 'pending'}`}>
                      {todo.completed ? '✅' : '⏳'}
                    </span>
                    <div>
                      <p className="activity-title">{todo.title}</p>
                      <p className="activity-subtitle">by {todo.user?.name}</p>
                    </div>
                    <span className="activity-time">{formatDate(todo.createdAt)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="users-section">
          <h2>All Users</h2>
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Theme</th>
                  <th>Admin</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`theme-badge ${user.theme}`}>
                        {user.theme === 'dark' ? '🌙' : '☀️'} {user.theme}
                      </span>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <span className="admin-badge">👑 Admin</span>
                      ) : (
                        <span className="user-badge">User</span>
                      )}
                    </td>
                    <td>{formatDate(user.createdAt)}</td>
                    <td>
                      {!user.isAdmin && (
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          🗑️ Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'todos' && (
        <div className="todos-section">
          <h2>All Tasks</h2>
          <div className="data-table">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>User</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Due Date</th>
                  <th>Created</th>
                </tr>
              </thead>
              <tbody>
                {todos.map(todo => (
                  <tr key={todo._id}>
                    <td>
                      <div className="todo-title">
                        {todo.title}
                        {todo.description && (
                          <p className="todo-description">{todo.description}</p>
                        )}
                      </div>
                    </td>
                    <td>{todo.user?.name || 'Unknown'}</td>
                    <td>
                      <span className={`priority-badge ${todo.priority}`}>
                        {todo.priority}
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${todo.completed ? 'completed' : 'pending'}`}>
                        {todo.completed ? '✅ Done' : '⏳ Pending'}
                      </span>
                    </td>
                    <td>{todo.dueDate ? formatDate(todo.dueDate) : 'No date'}</td>
                    <td>{formatDate(todo.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'messages' && (
        <div className="messages-section">
          <h2>All Messages</h2>
          <div className="messages-list">
            {messages.map(msg => (
              <div key={msg._id} className="message-card">
                <div className="message-header">
                  <div>
                    <strong>{msg.username}</strong>
                    <span className="message-email">{msg.user?.email}</span>
                  </div>
                  <span className="message-time">{formatDate(msg.createdAt)}</span>
                </div>
                <p className="message-content">{msg.message}</p>
                <span className="message-room">Room: {msg.room}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

