import React, { useState, useEffect } from 'react';
import { useTodos } from '../context/TodoContext';
import '../styles/ViewTasks.css';

function ViewTasks() {
  const { todos, loading, fetchTodos, updateTodo, deleteTodo } = useTodos();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleToggleComplete = async (todo) => {
    await updateTodo(todo._id, { completed: !todo.completed });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTodo(id);
    }
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  if (loading) {
    return <div className="loading">Loading tasks...</div>;
  }

  return (
    <div className="view-tasks-container">
      <div className="tasks-header">
        <h1>📋 All Tasks</h1>
        <div className="filter-buttons">
          <button
            className={filter === 'all' ? 'active' : ''}
            onClick={() => setFilter('all')}
          >
            All ({todos.length})
          </button>
          <button
            className={filter === 'pending' ? 'active' : ''}
            onClick={() => setFilter('pending')}
          >
            Pending ({todos.filter(t => !t.completed).length})
          </button>
          <button
            className={filter === 'completed' ? 'active' : ''}
            onClick={() => setFilter('completed')}
          >
            Completed ({todos.filter(t => t.completed).length})
          </button>
        </div>
      </div>

      <div className="tasks-grid">
        {filteredTodos.length === 0 ? (
          <p className="no-tasks">No tasks to display</p>
        ) : (
          filteredTodos.map((todo) => (
            <div
              key={todo._id}
              className={`task-item ${todo.completed ? 'completed' : ''} priority-${todo.priority}`}
            >
              <div className="task-content">
                <h3>{todo.title}</h3>
                {todo.description && <p>{todo.description}</p>}
                <div className="task-footer">
                  <span className={`priority-badge priority-${todo.priority}`}>
                    {todo.priority}
                  </span>
                  {todo.dueDate ? (
                    <span className="due-date">
                      📅 {(() => {
                        // dueDate is now stored as YYYY-MM-DD string
                        const dateStr = todo.dueDate.split('T')[0]; // Handle legacy format
                        const [year, month, day] = dateStr.split('-');
                        return new Date(year, month - 1, day).toLocaleDateString();
                      })()}
                    </span>
                  ) : (
                    <span className="due-date" style={{ color: '#999' }}>
                      📝 No Due Date
                    </span>
                  )}
                </div>
              </div>
              <div className="task-actions">
                <button
                  onClick={() => handleToggleComplete(todo)}
                  className={`btn-complete ${todo.completed ? 'btn-undo' : ''}`}
                >
                  {todo.completed ? '↩️ Undo' : '✓ Complete'}
                </button>
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="btn-delete"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ViewTasks;
