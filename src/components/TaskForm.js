import React, { useState, useEffect } from 'react';

const TaskForm = ({ onSaveTask, taskToEdit }) => {
  const [taskName, setTaskName] = useState('');
  const [taskDefinition, setTaskDefinition] = useState('');
  const [taskPriority, setTaskPriority] = useState('');
  const [taskStatus, setTaskStatus] = useState('');
  const [taskDueDate, setTaskDueDate] = useState('');

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.name);
      setTaskDefinition(taskToEdit.definition);
      setTaskPriority(taskToEdit.priority);
      setTaskStatus(taskToEdit.status);
      setTaskDueDate(taskToEdit.dueDate);
    } else {
      setTaskName('');
      setTaskDefinition('');
      setTaskPriority('');
      setTaskStatus('');
      setTaskDueDate('');
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      name: taskName,
      definition: taskDefinition,
      priority: taskPriority,
      status: taskStatus,
      dueDate: taskDueDate,
    };
    onSaveTask(newTask);
    setTaskName('');
    setTaskDefinition('');
    setTaskPriority('');
    setTaskStatus('');
    setTaskDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Task Name" value={taskName} onChange={(e) => setTaskName(e.target.value)} required />
      <textarea placeholder="Task Definition" value={taskDefinition} onChange={(e) => setTaskDefinition(e.target.value)} required />
      <select value={taskPriority} onChange={(e) => setTaskPriority(e.target.value)} required>
        <option value="">Select Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)} required>
        <option value="">Select Status</option>
        <option value="Pending">Pending</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </select>
      <input type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} required />
      <button type="submit">{taskToEdit ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
