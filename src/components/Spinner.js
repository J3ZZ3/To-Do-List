import React from 'react';
import './Spinner.css';

const Spinner = ({ size = 'medium', color = 'white', text = 'Loading...' }) => {
  return (
    <div className="spinner-overlay">
      <div className={`spinner-container ${size}`}>
        <div className="spinner" style={{ borderTopColor: color }}></div>
        <p className="spinner-text">{text}</p>
      </div>
    </div>
  );
};

export default Spinner; 