import React from 'react';
import './TaskProgress.css';

const TaskProgress = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const progressPercentage = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="progress-container">
      <div className="progress-header">
        <h3>
          <ion-icon name="trending-up-outline"></ion-icon>
          Overall Progress
        </h3>
      </div>
      
      <div className="progress-content">
        <div className="progress-ring">
          <svg viewBox="0 0 36 36" className="circular-chart">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#00FF66"
              strokeWidth="3"
              strokeDasharray={`${progressPercentage}, 100`}
              className="progress-ring-path"
            />
            <text x="18" y="20.35" className="percentage">
              {progressPercentage}%
            </text>
          </svg>
        </div>
        
        <div className="progress-label">
          <span>{completedTasks} of {totalTasks} tasks completed</span>
        </div>
      </div>
    </div>
  );
};

export default TaskProgress; 