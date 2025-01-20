import React from 'react';
import './TaskList.css'; // Ensure the styles are imported

const TaskList = ({ tasks, onEditTask, onDeleteTask, onCompleteTask }) => {
  return (
    <div className="task-list-container">
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}>
            <div className="task-details">
              <h3>{task.name}</h3>
              <p><strong>Definition:</strong> {task.definition}</p>
              <p><strong>Priority:</strong> {task.priority}</p>
              <p><strong>Status:</strong> {task.status}</p>
              <p><strong>Due Date:</strong> {task.dueDate}</p>
            </div>
            <div className="task-actions">
              <button onClick={() => onEditTask(task)}>Edit</button>
              <button onClick={() => onDeleteTask(task.id)}>Delete</button>
              <button onClick={() => onCompleteTask(task.id)}>Complete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
