import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Use environment variable for API URL in production
const API_BASE_URL = process.env.REACT_APP_API_URL || '';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem('token'));

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
  };

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        // Set default axios header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // Fetch user profile
        try {
          const response = await axios.get(`${API_BASE_URL}/api/auth/profile`);
          setUser(response.data.data);
        } catch (error) {
          console.error('Error fetching profile:', error);
          logout();
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    initAuth();
    // eslint-disable-next-line
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      const { token, ...userData } = response.data.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { name, email, password });
      const { token, ...userData } = response.data.data;
      
      localStorage.setItem('token', token);
      setToken(token);
      setUser(userData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed'
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

