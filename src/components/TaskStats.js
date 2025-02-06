import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../context/AuthContext';
import './TaskStats.css';

const calculateAverageCompletionTime = (tasks) => {
  const completedTasks = tasks.filter(task => task.status === 'Completed' && task.completed_at);
  
  if (completedTasks.length === 0) return 0;

  const totalTime = completedTasks.reduce((sum, task) => {
    const startDate = new Date(task.created_at);
    const endDate = new Date(task.completed_at);
    return sum + (endDate - startDate);
  }, 0);

  // Return average in days
  return Math.round((totalTime / completedTasks.length) / (1000 * 60 * 60 * 24));
};

const calculateProductivityScore = (stats) => {
  if (stats.total === 0) return 0;

  // Factors that contribute to productivity score
  const completionRate = (stats.completed / stats.total) * 100;
  const onTimeRate = (stats.completedOnTime / stats.total) * 100;
  const missedDeadlinesPenalty = (stats.missedDeadlines / stats.total) * 20;
  const recentActivityBonus = (stats.tasksThisWeek / stats.total) * 10;

  // Calculate final score (0-100)
  let score = (completionRate * 0.4) + // 40% weight for completion rate
              (onTimeRate * 0.3) + // 30% weight for on-time completion
              recentActivityBonus - // Bonus for recent activity
              missedDeadlinesPenalty; // Penalty for missed deadlines

  // Ensure score stays within 0-100 range
  return Math.min(Math.max(Math.round(score), 0), 100);
};

const TaskStats = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) fetchTasks();
  }, [user, fetchTasks]);

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.status === 'Completed').length,
    inProgress: tasks.filter(task => task.status === 'In Progress').length,
    pending: tasks.filter(task => task.status === 'Pending').length,
    highPriority: tasks.filter(task => task.priority === 'High').length,
    mediumPriority: tasks.filter(task => task.priority === 'Medium').length,
    lowPriority: tasks.filter(task => task.priority === 'Low').length,
    missedDeadlines: tasks.filter(task => {
      const deadline = new Date(task.deadline);
      const now = new Date();
      return task.status !== 'Completed' && deadline < now;
    }).length,
    tasksThisWeek: tasks.filter(task => {
        const taskDate = new Date(task.created_at);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return taskDate > weekAgo;
    }).length,
    completedOnTime: tasks.filter(task => {
        const dueDate = new Date(task.due_date);
        const completedDate = new Date(task.completed_at);
        return task.status === 'Completed' && completedDate <= dueDate;
    }).length,
    averageCompletionTime: calculateAverageCompletionTime(tasks)
  };

  if (loading) {
    return <div className="loading">Loading statistics...</div>;
  }

  return (
    <div className="stats-page-container">
      <div className="stats-header">
        <h2>Task Statistics</h2>
        <button onClick={() => navigate('/home')} className="back-button">
          <ion-icon name="arrow-back-outline"></ion-icon>
          Back to Home
        </button>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">
            <ion-icon name="list-outline"></ion-icon>
          </div>
          <div className="stat-content">
            <span className="stat-label">Total Tasks</span>
            <span className="stat-value">{stats.total}</span>
          </div>
        </div>

        <div className="stat-card completed">
          <div className="stat-icon">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </div>
          <div className="stat-content">
            <span className="stat-label">Completed</span>
            <span className="stat-value">{stats.completed}</span>
          </div>
        </div>

        <div className="stat-card in-progress">
          <div className="stat-icon">
            <ion-icon name="time-outline"></ion-icon>
          </div>
          <div className="stat-content">
            <span className="stat-label">In Progress</span>
            <span className="stat-value">{stats.inProgress}</span>
          </div>
        </div>

        <div className="stat-card pending">
          <div className="stat-icon">
            <ion-icon name="hourglass-outline"></ion-icon>
          </div>
          <div className="stat-content">
            <span className="stat-label">Pending</span>
            <span className="stat-value">{stats.pending}</span>
          </div>
        </div>

        <div className="stat-card high-priority">
          <div className="stat-icon">
            <ion-icon name="alert-circle-outline"></ion-icon>
          </div>
          <div className="stat-content">
            <span className="stat-label">High Priority</span>
            <span className="stat-value">{stats.highPriority}</span>
          </div>
        </div>

        <div className="stat-card medium-priority">
          <div className="stat-icon">
            <ion-icon name="alert-circle-outline"></ion-icon>
          </div>
          <div className="stat-content">
            <span className="stat-label">Medium Priority</span>
            <span className="stat-value">{stats.mediumPriority}</span>
          </div>
        </div>

        <div className="stat-card low-priority">
          <div className="stat-icon">
            <ion-icon name="alert-circle-outline"></ion-icon>
          </div>
          <div className="stat-content">
            <span className="stat-label">Low Priority</span>
            <span className="stat-value">{stats.lowPriority}</span>
          </div>
        </div>

        <div className="stat-card missed-deadlines">
          <div className="stat-icon">
            <ion-icon name="alert-outline"></ion-icon>
          </div>
          <div className="stat-content">
            <span className="stat-label">Missed Deadlines</span>
            <span className="stat-value">{stats.missedDeadlines}</span>
          </div>
        </div>

        <div className="stat-card priority-distribution">
          <div className="stat-icon">
            <ion-icon name="pie-chart-outline"></ion-icon>
          </div>
          <div className="stat-content">
            <span className="stat-label">Priority Distribution</span>
            <div className="priority-bars">
              <div className="priority-bar">
                <span>High: {(stats.highPriority / stats.total * 100).toFixed(1)}%</span>
                <div className="bar" style={{width: `${stats.highPriority / stats.total * 100}%`}} />
              </div>
              <div className="priority-bar">
                <span>Medium: {(stats.mediumPriority / stats.total * 100).toFixed(1)}%</span>
                <div className="bar" style={{width: `${stats.mediumPriority / stats.total * 100}%`}} />
              </div>
              <div className="priority-bar">
                <span>Low: {(stats.lowPriority / stats.total * 100).toFixed(1)}%</span>
                <div className="bar" style={{width: `${stats.lowPriority / stats.total * 100}%`}} />
              </div>
            </div>
          </div>
        </div>

        <div className="stat-card productivity">
          <div className="stat-icon">
            <ion-icon name="trophy-outline"></ion-icon>
          </div>
          <div className="stat-content">
            <span className="stat-label">Productivity Score</span>
            <span className="stat-value">
              {calculateProductivityScore(stats)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats; 