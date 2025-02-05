import React, { useEffect } from 'react';
import './CustomAlert.css';

const CustomAlert = ({ 
  type = 'info', 
  title, 
  message, 
  onClose, 
  duration = 3000,
  showConfirmButton = false,
  onConfirm,
  confirmText = 'OK',
  showCancelButton = false,
  onCancel,
  cancelText = 'Cancel'
}) => {
  useEffect(() => {
    if (!showConfirmButton && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [duration, onClose, showConfirmButton]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '!';
      case 'info':
        return 'i';
      default:
        return 'i';
    }
  };

  return (
    <div className="custom-alert-overlay" onClick={showConfirmButton ? null : onClose}>
      <div className="custom-alert" onClick={e => e.stopPropagation()}>
        <div className={`custom-alert-icon ${type}`}>
          {getIcon()}
        </div>
        {title && <h3 className="custom-alert-title">{title}</h3>}
        <p className="custom-alert-message">{message}</p>
        
        {(showConfirmButton || showCancelButton) && (
          <div className="custom-alert-buttons">
            {showConfirmButton && (
              <button 
                className={`custom-alert-button confirm ${type}`}
                onClick={onConfirm || onClose}
              >
                {confirmText}
              </button>
            )}
            {showCancelButton && (
              <button 
                className="custom-alert-button cancel"
                onClick={onCancel || onClose}
              >
                {cancelText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomAlert; 