import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import TopBar from '../components/TopBar';
import DashboardHome from '../components/DashboardHome';
import AddTodo from '../components/AddTodo';
import ViewTasks from '../components/ViewTasks';
import Analytics from '../components/Analytics';
import Chat from './Chat';
import AdminDashboard from './AdminDashboard';
import '../styles/Dashboard.css';

function Dashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardHome />;
      case 'addtodo':
        return <AddTodo />;
      case 'viewtasks':
        return <ViewTasks />;
      case 'analytics':
        return <Analytics />;
      case 'chat':
        return <Chat />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="dashboard-layout">
      <TopBar />
      <div className="dashboard-main">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="dashboard-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

