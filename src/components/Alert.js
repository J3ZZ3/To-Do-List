import React from 'react';
import './Alert.css';

const Alert = ({ message, type, onClose }) => {
  return (
    <div className={`alert alert-${type}`}>
      <span className="alert-message">{message}</span>
      <button className="alert-close" onClick={onClose}>×</button>
    </div>
  );
};

export default Alert; 