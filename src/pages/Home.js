import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { useAuth } from '../context/AuthContext';
import TaskList from '../components/TaskList';
import Deadline from '../components/Deadline';
import SearchBar from '../components/SearchBar';
import './Home.css';
import TaskProgress from '../components/TaskProgress';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useAuth();
  const STATUS_CYCLE = ['Pending', 'In Progress', 'Completed'];

  const getNextStatus = (currentStatus) => {
    const currentIndex = STATUS_CYCLE.indexOf(currentStatus);
    return STATUS_CYCLE[(currentIndex + 1) % STATUS_CYCLE.length];
  };

  const fetchTasks = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error.message);
      alert('Failed to fetch tasks. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user, fetchTasks]);

  const handleDeleteTask = async (id) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error.message);
      alert('Failed to delete task. Please try again.');
    }
  };

  const handleCompleteTask = async (task) => {
    try {
      const nextStatus = getNextStatus(task.status);
      
      const { error } = await supabase
        .from('tasks')
        .update({ status: nextStatus })
        .eq('id', task.id);

      if (error) throw error;

      setTasks(tasks.map(t => 
        t.id === task.id 
          ? { ...t, status: nextStatus }
          : t
      ));

    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const handleEditTask = (task) => {
    navigate('/edit-task', { state: { task } });
  };

  const handleClearAllTasks = async () => {
    if (window.confirm('Are you sure you want to delete all tasks? This action cannot be undone.')) {
      try {
        const { error } = await supabase
          .from('tasks')
          .delete()
          .eq('user_id', user.id);

        if (error) throw error;
        setTasks([]);
      } catch (error) {
        console.error('Error clearing tasks:', error.message);
        alert('Failed to clear tasks. Please try again.');
      }
    }
  };

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-sidebar">
          <Deadline tasks={tasks} />
          <TaskProgress tasks={tasks} />
        </div>
        
        <div className="home-main">
          {isLoading ? (
            <div className="loading">Loading tasks...</div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-message">
                <span>👋 Welcome!</span>
                <span>Start by adding your first task</span>
                <button 
                  className="add-task-button"
                  onClick={() => navigate('/add-task')}
                >
                  <ion-icon name="add-outline"></ion-icon>
                  Add Task
                </button>
              </div>
            </div>
          ) : (
            <>
              <SearchBar 
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <TaskList 
                tasks={filteredTasks} 
                onEditTask={handleEditTask} 
                onDeleteTask={handleDeleteTask} 
                onCompleteTask={handleCompleteTask}
                onClearAllTasks={handleClearAllTasks}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
