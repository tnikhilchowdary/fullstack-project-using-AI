import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

// Use environment variable for API URL in production
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const { user } = useAuth();
  const [theme, setTheme] = useState(() => {
    // Try to get theme from localStorage first
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  // Sync theme from user profile when user logs in
  useEffect(() => {
    if (user?.theme) {
      setTheme(user.theme);
      localStorage.setItem('theme', user.theme);
    }
  }, [user]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    // Save to backend if user is logged in
    if (user) {
      try {
        await axios.put(`${API_BASE_URL}/api/auth/theme`, { theme: newTheme });
      } catch (error) {
        console.error('Error saving theme preference:', error);
      }
    }
  };

  const value = {
    theme,
    toggleTheme,
    isDark: theme === 'dark'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};




