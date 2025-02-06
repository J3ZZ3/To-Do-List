import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskDetails from './TaskDetails';
import './TaskList.css'; // Ensure the styles are imported

const TaskList = ({ tasks, onEditTask, onDeleteTask, onCompleteTask, onClearAllTasks }) => {
  const navigate = useNavigate();
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

  const handleClearAllTasks = () => {
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      onClearAllTasks();
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
      <div className="task-header-actions">
        <div className="task-management-buttons">
          <button 
            className="add-task-button" 
            onClick={() => navigate('/add-task')}
          >
            <ion-icon name="add-outline"></ion-icon>
            Add New Task
          </button>
          <button 
            className="clear-tasks-button" 
            onClick={handleClearAllTasks}
          >
            <ion-icon name="trash-outline"></ion-icon>
            Clear All Tasks
          </button>
        </div>
        
        <div className="task-filters">
          <div className="filter-group">
            <select 
              value={filters.priority} 
              onChange={(e) => setFilters({...filters, priority: e.target.value})}
            >
              <option value="all">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div className="filter-group">
            <select 
              value={filters.status} 
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>

          <div className="filter-group">
            <input 
              type="date" 
              value={filters.dueDate} 
              onChange={(e) => setFilters({...filters, dueDate: e.target.value})}
            />
          </div>
        </div>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li 
            key={task.id} 
            className={`task-item ${task.status === 'Completed' ? 'completed' : ''}`}
            onClick={() => setSelectedTask(task)}
          >
            <div className="task-content">
              <div className="task-header">
                <h3>{task.name}</h3>
                <div className="task-badges">
                  <span className={`task-status ${getStatusClass(task.status)}`}>
                    {task.status}
                  </span>
                  <span className={`task-priority ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              </div>
              <div className="task-info">
                <p><strong>Due:</strong> {task.due_date}</p>
                {task.description && (
                  <p className="task-description">{task.description}</p>
                )}
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
          onDeleteTask={(id) => {
            onDeleteTask(id);
            setSelectedTask(null);
          }}
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
