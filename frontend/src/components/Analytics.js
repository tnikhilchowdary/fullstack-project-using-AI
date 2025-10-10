import React, { useEffect } from 'react';
import { useTodos } from '../context/TodoContext';
import { PieChart, Pie, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Analytics.css';

function Analytics() {
  const { todos, loading, fetchTodos } = useTodos();

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const stats = {
    total: todos.length,
    completed: todos.filter(t => t.completed).length,
    pending: todos.filter(t => !t.completed).length,
    high: todos.filter(t => t.priority === 'high').length,
    medium: todos.filter(t => t.priority === 'medium').length,
    low: todos.filter(t => t.priority === 'low').length,
    completionRate: todos.length > 0 
      ? Math.round((todos.filter(t => t.completed).length / todos.length) * 100)
      : 0
  };

  // Data for Completion Status Pie Chart
  const completionData = [
    { name: 'Completed', value: stats.completed, color: '#28a745' },
    { name: 'Pending', value: stats.pending, color: '#ffc107' }
  ].filter(item => item.value > 0);

  // Data for Priority Distribution Pie Chart
  const priorityData = [
    { name: 'High Priority', value: stats.high, color: '#dc3545' },
    { name: 'Medium Priority', value: stats.medium, color: '#ffc107' },
    { name: 'Low Priority', value: stats.low, color: '#28a745' }
  ].filter(item => item.value > 0);

  // Data for Priority vs Completion Bar Chart
  const priorityCompletionData = [
    {
      priority: 'High',
      completed: todos.filter(t => t.priority === 'high' && t.completed).length,
      pending: todos.filter(t => t.priority === 'high' && !t.completed).length
    },
    {
      priority: 'Medium',
      completed: todos.filter(t => t.priority === 'medium' && t.completed).length,
      pending: todos.filter(t => t.priority === 'medium' && !t.completed).length
    },
    {
      priority: 'Low',
      completed: todos.filter(t => t.priority === 'low' && t.completed).length,
      pending: todos.filter(t => t.priority === 'low' && !t.completed).length
    }
  ];

  // Custom label for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontWeight="bold"
        fontSize="14"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  if (loading) {
    return <div className="loading">Loading analytics...</div>;
  }

  return (
    <div className="analytics-container">
      <h1>📈 Task Analytics Dashboard</h1>

      <div className="analytics-grid">
        <div className="stat-box total">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Total Tasks</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>

        <div className="stat-box completed">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Completed</h3>
            <p className="stat-value">{stats.completed}</p>
          </div>
        </div>

        <div className="stat-box pending">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>Pending</h3>
            <p className="stat-value">{stats.pending}</p>
          </div>
        </div>

        <div className="stat-box rate">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>Completion Rate</h3>
            <p className="stat-value">{stats.completionRate}%</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      {stats.total > 0 && (
        <>
          <div className="charts-row">
            {/* Completion Status Pie Chart */}
            <div className="chart-container">
              <h2>📊 Task Completion Status</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={completionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {completionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Priority Distribution Pie Chart */}
            <div className="chart-container">
              <h2>🎯 Priority Distribution</h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={priorityData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {priorityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Priority vs Completion Bar Chart */}
          <div className="chart-container-full">
            <h2>📈 Priority vs Completion Status</h2>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart
                data={priorityCompletionData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="priority" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completed" fill="#28a745" name="Completed" />
                <Bar dataKey="pending" fill="#ffc107" name="Pending" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}

      {stats.total === 0 && (
        <div className="no-data-message">
          <p>📭 No tasks available yet. Create some tasks to see analytics!</p>
        </div>
      )}

      <div className="progress-section">
        <h2>Overall Progress</h2>
        <div className="progress-bar-container">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${stats.completionRate}%` }}
          >
            <span className="progress-text">{stats.completionRate}%</span>
          </div>
        </div>
        <p className="progress-info">
          {stats.completed} of {stats.total} tasks completed
        </p>
      </div>
    </div>
  );
}

export default Analytics;
