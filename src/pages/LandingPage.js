import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1>Welcome to TaskMaster</h1>
        <p className="tagline">Organize your life, one task at a time</p>
        
        <div className="features">
          <div className="feature-item">
            <h3>📝 Simple Task Management</h3>
            <p>Create, edit, and organize your tasks with ease</p>
          </div>
          <div className="feature-item">
            <h3>🎯 Set Priorities</h3>
            <p>Prioritize tasks and focus on what matters most</p>
          </div>
          <div className="feature-item">
            <h3>📅 Due Dates</h3>
            <p>Never miss a deadline with due date reminders</p>
          </div>
          <div className="feature-item">
            <h3>🔒 Secure</h3>
            <p>Your data is protected with secure authentication</p>
          </div>
        </div>

        <button 
          className="get-started-btn"
          onClick={() => navigate('/login')}
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage; 