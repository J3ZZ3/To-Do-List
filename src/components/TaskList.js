import React, { useState } from 'react';
import './TaskList.css'; // Ensure the styles are imported

const TaskList = ({ tasks, onEditTask, onDeleteTask, onCompleteTask }) => {
  const [filters, setFilters] = useState({
    priority: 'all',
    status: 'all',
    dueDate: ''
  });

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'task-priority-high';
      case 'medium': return 'task-priority-medium';
      case 'low': return 'task-priority-low';
      default: return '';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    const matchesStatus = filters.status === 'all' || 
      (filters.status === 'completed' ? task.status === 'Completed' : task.status !== 'Completed');
    const matchesDueDate = !filters.dueDate || task.dueDate === filters.dueDate;

    return matchesPriority && matchesStatus && matchesDueDate;
  });

  return (
    <div className="task-list-container">
      <div className="task-filters">
        <select 
          value={filters.priority} 
          onChange={(e) => setFilters({...filters, priority: e.target.value})}
        >
          <option value="all">All Priorities</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select 
          value={filters.status} 
          onChange={(e) => setFilters({...filters, status: e.target.value})}
        >
          <option value="all">All Status</option>
          <option value="completed">Completed</option>
          <option value="incomplete">Incomplete</option>
        </select>

        <input 
          type="date" 
          value={filters.dueDate} 
          onChange={(e) => setFilters({...filters, dueDate: e.target.value})}
        />
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li 
            key={task.id} 
            className={`task-item ${task.status === 'Completed' ? 'completed' : ''} ${getPriorityColor(task.priority)}`}
          >
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
