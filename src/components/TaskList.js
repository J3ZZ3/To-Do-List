import React from 'react';

const TaskList = ({ tasks, onEditTask, onDeleteTask, onCompleteTask }) => {
  return (
    <div className="task-list-container">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">
          <h3>{task.name}</h3>
          <p><strong>Definition:</strong> {task.definition}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Due Date:</strong> {task.dueDate}</p>
          <button onClick={() => onEditTask(task)}>Edit</button>
          <button onClick={() => onDeleteTask(task.id)}>Delete</button>
          <button onClick={() => onCompleteTask(task.id)}>Complete</button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
