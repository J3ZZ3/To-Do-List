import React from 'react';
import './TaskDetails.css';

const TaskDetails = ({ task, onClose, onEditTask, onDeleteTask, onCompleteTask }) => {
  if (!task) return null;

  return (
    <div className="task-details-overlay" onClick={onClose}>
      <div className="task-details-modal" onClick={e => e.stopPropagation()}>
        <div className="task-details-header">
          <h2>Task Details</h2>
          <button className="close-button" onClick={onClose}>
            <ion-icon name="close-outline"></ion-icon>
          </button>
        </div>

        <div className="task-details-content">
          <div className="task-info">
            <div className="info-item">
              <span className="info-label">Task Name</span>
              <span className="info-value">{task.name}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Description</span>
              <span className="info-value">{task.definition || 'No description provided'}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Priority</span>
              <span className="info-value">{task.priority}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className="info-value">{task.status}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Due Date</span>
              <span className="info-value">{task.due_date}</span>
            </div>
          </div>
        </div>

        <div className="task-actions">
          <button 
            className="action-button edit-button"
            onClick={() => onEditTask(task)}
          >
            <ion-icon name="create-outline"></ion-icon>
            Edit
          </button>
          
          <button 
            className="action-button complete-button"
            onClick={() => onCompleteTask(task)}
          >
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            {task.status === 'Completed' ? 'Mark Incomplete' : 'Next Status'}
          </button>
          
          <button 
            className="action-button delete-button"
            onClick={() => onDeleteTask(task.id)}
          >
            <ion-icon name="trash-outline"></ion-icon>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails; 