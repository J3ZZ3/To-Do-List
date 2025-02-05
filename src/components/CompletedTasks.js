import React from 'react';
import { getTasks } from '../utils/taskUtils';
import './styles.css';

const CompletedTasks = () => {
  const tasks = getTasks().filter(task => task.completed);

  return (
    <div className="completed-tasks-container">
      <h2>Completed Tasks</h2>
      {tasks.length === 0 ? <p>No completed tasks.</p> : (
        <ul className="task-list">
          {tasks.map(task => (
            <li key={task.id} className="completed-task-item">{task.name} - Completed</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedTasks;