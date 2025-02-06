import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error.message);
      // Optionally show an error message to the user
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate('/home')}>
          <ion-icon name="checkbox-outline"></ion-icon>
          <span>TaskMaster</span>
        </div>
        
        <div className="navbar-menu">
          <button 
            onClick={() => navigate('/home')} 
            className={`nav-button ${location.pathname === '/home' ? 'active' : ''}`}
          >
            <ion-icon name="home-outline"></ion-icon>
            <span>Home</span>
          </button>
          
          <button 
            onClick={() => navigate('/stats')} 
            className={`nav-button ${location.pathname === '/stats' ? 'active' : ''}`}
          >
            <ion-icon name="stats-chart-outline"></ion-icon>
            <span>Stats</span>
          </button>
          
          <button 
            onClick={() => navigate('/profile')} 
            className={`nav-button ${location.pathname === '/profile' ? 'active' : ''}`}
          >
            <ion-icon name="person-outline"></ion-icon>
            <span>Profile</span>
          </button>
          
          <button 
            onClick={handleLogout} 
            className="nav-button logout-button"
          >
            <ion-icon name="log-out-outline"></ion-icon>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 