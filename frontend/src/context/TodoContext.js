import React, { createContext, useState, useContext, useCallback } from 'react';
import { getTodos as fetchTodosAPI, createTodo as createTodoAPI, updateTodo as updateTodoAPI, deleteTodo as deleteTodoAPI } from '../services/api';

const TodoContext = createContext();

export const useTodos = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodos must be used within TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all todos
  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchTodosAPI();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create a new todo
  const createTodo = useCallback(async (todoData) => {
    try {
      await createTodoAPI(todoData);
      await fetchTodos(); // Refresh the list
      return { success: true };
    } catch (error) {
      console.error('Error creating todo:', error);
      return { success: false, error };
    }
  }, [fetchTodos]);

  // Update a todo
  const updateTodo = useCallback(async (id, todoData) => {
    try {
      await updateTodoAPI(id, todoData);
      await fetchTodos(); // Refresh the list
      return { success: true };
    } catch (error) {
      console.error('Error updating todo:', error);
      return { success: false, error };
    }
  }, [fetchTodos]);

  // Delete a todo
  const deleteTodo = useCallback(async (id) => {
    try {
      await deleteTodoAPI(id);
      await fetchTodos(); // Refresh the list
      return { success: true };
    } catch (error) {
      console.error('Error deleting todo:', error);
      return { success: false, error };
    }
  }, [fetchTodos]);

  // Helper function to get date string in YYYY-MM-DD format
  const getDateString = (date) => {
    if (!date) return null;
    
    // Dates from backend are now stored as YYYY-MM-DD strings
    if (typeof date === 'string') {
      return date.split('T')[0]; // Handle both "YYYY-MM-DD" and "YYYY-MM-DDTHH:mm:ss" formats
    }
    
    // If it's a Date object (from calendar), convert to YYYY-MM-DD using local timezone
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getTomorrowString = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const year = tomorrow.getFullYear();
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0');
    const day = String(tomorrow.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Filter functions
  const todayTasks = todos.filter(todo => {
    if (!todo.dueDate) return false;
    return getDateString(todo.dueDate) === getTodayString();
  });

  const tomorrowTasks = todos.filter(todo => {
    if (!todo.dueDate) return false;
    return getDateString(todo.dueDate) === getTomorrowString();
  });

  const pastDueTasks = todos.filter(todo => {
    if (!todo.dueDate) return false;
    return getDateString(todo.dueDate) < getTodayString() && !todo.completed;
  });

  const futureTasks = todos.filter(todo => {
    if (!todo.dueDate) return false;
    return getDateString(todo.dueDate) > getTomorrowString();
  });

  const noDueDateTasks = todos.filter(todo => !todo.dueDate);

  const value = {
    todos,
    loading,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
    getDateString,
    getTodayString,
    getTomorrowString,
    todayTasks,
    tomorrowTasks,
    pastDueTasks,
    futureTasks,
    noDueDateTasks
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

