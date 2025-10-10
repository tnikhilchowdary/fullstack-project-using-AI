import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

function Navbar({ activeTab, setActiveTab }) {
  const { user } = useAuth();
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'addtodo', label: 'Add Todo', icon: '➕' },
    { id: 'viewtasks', label: 'View Tasks', icon: '📋' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'chat', label: 'Team Chat', icon: '💬' }
  ];

  // Add Admin menu item if user is admin
  if (user?.isAdmin) {
    menuItems.push({ id: 'admin', label: 'Admin Panel', icon: '👑' });
  }

  return (
    <div className="navbar">
      <div className="navbar-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;

