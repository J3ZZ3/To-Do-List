import React from 'react';
import { getTasks } from '../utils/taskUtils';
import './styles.css';
const CompletedTasks = () => {
  const tasks = getTasks().filter(task => task.completed);

  return (
    <div>
      <h2>Completed Tasks</h2>
      {tasks.length === 0 ? <p>No completed tasks.</p> : (
        <ul>
          {tasks.map(task => (
            <li key={task.id}>{task.taskName} - Completed</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompletedTasks;