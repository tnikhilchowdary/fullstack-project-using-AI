import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import '../styles/TopBar.css';

function TopBar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="topbar">
      <div className="topbar-left">
        <div className="logo">
          <span className="logo-text">TNC-TEAM</span>
        </div>
      </div>

      <div className="topbar-right">
        {/* Theme Toggle Button */}
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>

        <div className="profile-menu" onClick={() => setShowMenu(!showMenu)}>
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <span className="profile-name">{user?.name}</span>
          <span className="dropdown-arrow">▼</span>
          
          {showMenu && (
            <div className="profile-dropdown">
              <div className="dropdown-item">
                <span>👤 {user?.email}</span>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-item" onClick={handleLogout}>
                <span>🚪 Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TopBar;

