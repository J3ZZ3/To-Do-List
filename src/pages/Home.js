import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import './Home.css';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleSaveTask = (newTask) => {
    const updatedTasks = taskToEdit
      ? tasks.map((task) => (task.id === newTask.id ? newTask : task))
      : [...tasks, newTask];

    setTasks(updatedTasks);
    setTaskToEdit(null);
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  };

  const handleCompleteTask = (id) => {
    const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, status: 'Completed' } : task));
    setTasks(updatedTasks);
  };

  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  return (
    <div className="home-container">
      <header>
        <button onClick={() => { window.location.href = "/Login"; }}>Logout</button>
        <button onClick={() => { window.location.href = "/Profile"; }}>Profile</button>
      </header>
      <h2>Task Manager</h2>
      <TaskForm onSaveTask={handleSaveTask} taskToEdit={taskToEdit} />
      <TaskList tasks={tasks} onEditTask={handleEditTask} onDeleteTask={handleDeleteTask} onCompleteTask={handleCompleteTask} />
    </div>
  );
};

export default Home;
