import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../context/AuthContext';
import './TaskForm.css';

const TaskForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const taskToEdit = location.state?.task;

  const [formData, setFormData] = useState({
    name: taskToEdit?.name || '',
    definition: taskToEdit?.definition || '',
    priority: taskToEdit?.priority || 'Medium',
    status: taskToEdit?.status || 'Pending',
    dueDate: taskToEdit?.due_date || ''
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      setIsLoading(true);

      const taskData = {
        name: formData.name.trim(),
        definition: formData.definition.trim(),
        priority: formData.priority,
        status: formData.status,
        due_date: formData.dueDate,
        user_id: user.id
      };

      let error;
      if (taskToEdit) {
        const { error: updateError } = await supabase
          .from('tasks')
          .update(taskData)
          .eq('id', taskToEdit.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('tasks')
          .insert([taskData]);
        error = insertError;
      }

      if (error) throw error;
      navigate('/home');
    } catch (error) {
      console.error('Error saving task:', error.message);
      alert('Error saving task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <div className="form-header">
        <h2>{taskToEdit ? 'Edit Task' : 'Create New Task'}</h2>
        <button 
          onClick={() => navigate('/home')} 
          className="back-button"
          type="button"
        >
          <ion-icon name="arrow-back-outline"></ion-icon>
          Back
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Task Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter task name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="definition">Description</label>
          <textarea
            id="definition"
            name="definition"
            value={formData.definition}
            onChange={handleChange}
            placeholder="Enter task description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Saving...' : (taskToEdit ? 'Update Task' : 'Create Task')}
          </button>
          <button 
            type="button" 
            className="cancel-button"
            onClick={() => navigate('/home')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
