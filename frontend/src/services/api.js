import axios from 'axios';

// Use environment variable for API URL, fallback to proxy for local development
const BASE_URL = process.env.REACT_APP_API_URL || '';
const API_URL = `${BASE_URL}/api/todos`;

// Get all todos
export const getTodos = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Get single todo
export const getTodo = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Create new todo
export const createTodo = async (todoData) => {
  const response = await axios.post(API_URL, todoData);
  return response.data;
};

// Update todo
export const updateTodo = async (id, todoData) => {
  const response = await axios.put(`${API_URL}/${id}`, todoData);
  return response.data;
};

// Delete todo
export const deleteTodo = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

