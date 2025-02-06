import React, { useState } from 'react';
import TaskDetails from './TaskDetails';
import './TaskList.css'; // Ensure the styles are imported

const TaskList = ({ tasks, onEditTask, onDeleteTask, onCompleteTask }) => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [filters, setFilters] = useState({
    priority: 'all',
    status: 'all',
    dueDate: ''
  });

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'status-pending';
      case 'in progress': return 'status-in-progress';
      case 'completed': return 'status-completed';
      default: return '';
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const filteredTasks = tasks.filter(task => {
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    const matchesStatus = filters.status === 'all' || 
      (filters.status === 'completed' ? task.status === 'Completed' : task.status !== 'Completed');
    const matchesDueDate = !filters.dueDate || task.due_date === filters.dueDate;

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
            className="task-item"
            onClick={() => setSelectedTask(task)}
          >
            <div className="task-details">
              <h3>{task.name}</h3>
              <p><strong>Due Date:</strong> {task.due_date}</p>
              <div className="task-badges">
                <span className={`task-status ${getStatusClass(task.status)}`}>
                  {task.status}
                </span>
                <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {selectedTask && (
        <TaskDetails
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onEditTask={(task) => {
            onEditTask(task);
            setSelectedTask(null);
          }}
          onDeleteTask={onDeleteTask}
          onCompleteTask={(id) => {
            onCompleteTask(id);
            setSelectedTask(null);
          }}
        />
      )}
    </div>
  );
};

export default TaskList;
