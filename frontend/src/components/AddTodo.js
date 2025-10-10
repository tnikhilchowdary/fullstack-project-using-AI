import React, { useState } from 'react';
import { useTodos } from '../context/TodoContext';
import '../styles/AddTodo.css';

function AddTodo() {
  const { createTodo } = useTodos();

  // Get today's date in YYYY-MM-DD format
  const getTodayDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: getTodayDate()  // Default to today
  });
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await createTodo(formData);
    
    if (result.success) {
      setMessage({ type: 'success', text: '✅ Todo created successfully! Dashboard will auto-refresh.' });
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        dueDate: getTodayDate()  // Reset to today
      });
    } else {
      setMessage({ type: 'error', text: '❌ Failed to create todo' });
    }
    
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  return (
    <div className="add-todo-container">
      <h1>➕ Add New Todo</h1>
      
      {message.text && (
        <div className={`message ${message.type}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="add-todo-form">
        <div className="form-row">
          <div className="form-group">
            <label>Task Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Enter task title..."
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Due Date (For Calendar & Dashboard) *</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Enter task description..."
            value={formData.description}
            onChange={handleChange}
            rows="4"
          />
        </div>

        <div className="form-group">
          <label>Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>
        </div>

        <button type="submit" className="submit-btn">
          Create Todo
        </button>
      </form>
    </div>
  );
}

export default AddTodo;
