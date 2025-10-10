import React, { useState, useEffect } from 'react';
import { useTodos } from '../context/TodoContext';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/DashboardHome.css';

function DashboardHome() {
  const {
    todos,
    loading,
    fetchTodos,
    todayTasks,
    tomorrowTasks,
    pastDueTasks,
    futureTasks,
    noDueDateTasks,
    getDateString
  } = useTodos();

  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Get tasks for the selected date
  const getTasksForDate = (date) => {
    const dateStr = getDateString(date);
    console.log('🔍 Calendar Click Debug:');
    console.log('  Selected calendar date:', date);
    console.log('  Converted to string:', dateStr);
    
    const matchingTodos = todos.filter(todo => {
      if (!todo.dueDate) return false;
      const todoDateStr = getDateString(todo.dueDate);
      const matches = todoDateStr === dateStr;
      console.log(`  📝 Task "${todo.title}":`, {
        rawDueDate: todo.dueDate,
        converted: todoDateStr,
        matches: matches ? '✅' : '❌'
      });
      return matches;
    });
    
    console.log(`  ✅ Found ${matchingTodos.length} matching tasks`);
    return matchingTodos;
  };

  // Get pending tasks for the selected date
  const selectedDateTasks = getTasksForDate(selectedDate);
  const selectedDatePendingTasks = selectedDateTasks.filter(task => !task.completed);

  const TaskCard = ({ task, showStatus }) => (
    <div className={`task-card ${task.completed ? 'completed' : ''} priority-${task.priority}`}>
      <h4>{task.title}</h4>
      {task.description && <p>{task.description}</p>}
      <div className="task-meta">
        <span className={`priority-badge priority-${task.priority}`}>{task.priority}</span>
        {showStatus && task.completed && <span className="completed-badge">✓ Done</span>}
        {showStatus && !task.completed && <span className="pending-badge">⏳ Pending</span>}
      </div>
    </div>
  );

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard-home">
      <h1>Welcome to Your Dashboard!</h1>
      
      <div className="dashboard-grid">
        <div className="task-section">
          <div className="section-header">
            <h2>📅 Today's Tasks</h2>
            <span className="task-count">{todayTasks.length}</span>
          </div>
          <div className="task-list">
            {todayTasks.length === 0 ? (
              <p className="no-tasks">No tasks for today</p>
            ) : (
              todayTasks.map(task => <TaskCard key={task._id} task={task} />)
            )}
          </div>
        </div>

        <div className="task-section">
          <div className="section-header">
            <h2>⏰ Tomorrow's Tasks</h2>
            <span className="task-count">{tomorrowTasks.length}</span>
          </div>
          <div className="task-list">
            {tomorrowTasks.length === 0 ? (
              <p className="no-tasks">No tasks for tomorrow</p>
            ) : (
              tomorrowTasks.map(task => <TaskCard key={task._id} task={task} />)
            )}
          </div>
        </div>

        {pastDueTasks.length > 0 && (
          <div className="task-section" style={{ border: '2px solid #ff5252' }}>
            <div className="section-header">
              <h2>⚠️ Past Due</h2>
              <span className="task-count" style={{ background: '#ff5252' }}>{pastDueTasks.length}</span>
            </div>
            <div className="task-list">
              {pastDueTasks.map(task => <TaskCard key={task._id} task={task} />)}
            </div>
          </div>
        )}

        {futureTasks.length > 0 && (
          <div className="task-section">
            <div className="section-header">
              <h2>🔮 Future Tasks</h2>
              <span className="task-count">{futureTasks.length}</span>
            </div>
            <div className="task-list">
              {futureTasks.map(task => <TaskCard key={task._id} task={task} />)}
            </div>
          </div>
        )}

        {noDueDateTasks.length > 0 && (
          <div className="task-section">
            <div className="section-header">
              <h2>📝 Tasks (No Due Date)</h2>
              <span className="task-count">{noDueDateTasks.length}</span>
            </div>
            <div className="task-list">
              {noDueDateTasks.map(task => <TaskCard key={task._id} task={task} />)}
            </div>
          </div>
        )}

        <div className="calendar-section">
          <div className="section-header">
            <h2>📆 Calendar</h2>
          </div>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileClassName={({ date }) => {
              const calendarDateStr = getDateString(date);
              const hasTasks = todos.some(todo => {
                if (!todo.dueDate) return false;
                return getDateString(todo.dueDate) === calendarDateStr;
              });
              return hasTasks ? 'has-tasks' : null;
            }}
          />
          <div className="calendar-info">
            <p><strong>Selected:</strong> {selectedDate.toDateString()}</p>
            <p className="calendar-hint">Click on dates to see tasks</p>
          </div>

          {/* Show tasks for selected date */}
          <div className="selected-date-tasks">
            <div className="section-header" style={{ marginTop: '20px' }}>
              <h3>📋 Pending Tasks for {selectedDate.toLocaleDateString()}</h3>
              <span className="task-count">{selectedDatePendingTasks.length}</span>
            </div>
            <div className="task-list">
              {selectedDatePendingTasks.length === 0 ? (
                <p className="no-tasks">
                  {selectedDateTasks.length > 0 
                    ? '✅ All tasks completed for this date!' 
                    : 'No tasks scheduled for this date'}
                </p>
              ) : (
                selectedDatePendingTasks.map(task => (
                  <TaskCard key={task._id} task={task} showStatus={true} />
                ))
              )}
            </div>

            {/* Show completed tasks count if any */}
            {selectedDateTasks.filter(t => t.completed).length > 0 && (
              <p style={{ marginTop: '10px', fontSize: '13px', color: '#666', textAlign: 'center' }}>
                ✓ {selectedDateTasks.filter(t => t.completed).length} completed task(s)
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p className="stat-number">{todos.length}</p>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number">{todos.filter(t => t.completed).length}</p>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number">{todos.filter(t => !t.completed).length}</p>
        </div>
      </div>
    </div>
  );
}

export default DashboardHome;
