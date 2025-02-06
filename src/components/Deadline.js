import React, { useState } from 'react';
import TaskDetails from './TaskDetails';
import './Deadline.css';

const Deadline = ({ tasks }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 3);

  const upcomingTasks = tasks
    .filter(task => {
      if (!task.due_date || task.status === 'Completed') return false;
      const dueDate = new Date(task.due_date);
      return dueDate <= threeDaysFromNow && dueDate >= today;
    })
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

  const getTimeRemaining = (dueDate) => {
    const due = new Date(dueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'deadline-priority-high';
      case 'medium': return 'deadline-priority-medium';
      case 'low': return 'deadline-priority-low';
      default: return '';
    }
  };

  return (
    <>
      <div className="deadline-container">
        <div className="deadline-header">
          <h3>
            <ion-icon name="alarm-outline"></ion-icon>
            Upcoming Deadlines
          </h3>
        </div>
        
        {upcomingTasks.length === 0 ? (
          <div className="no-deadlines">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
            <p>No upcoming deadlines</p>
          </div>
        ) : (
          <ul className="deadline-list">
            {upcomingTasks.map(task => (
              <li 
                key={task.id} 
                className={`deadline-item ${getPriorityClass(task.priority)}`}
                onClick={() => setSelectedTask(task)}
              >
                <div className="deadline-task-name">{task.name}</div>
                <div className="deadline-time-remaining">
                  {getTimeRemaining(task.due_date)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEditTask={() => setSelectedTask(null)}
          onDeleteTask={() => setSelectedTask(null)}
          onCompleteTask={() => setSelectedTask(null)}
          viewOnly={true}
        />
      )}
    </>
  );
};

export default Deadline; 