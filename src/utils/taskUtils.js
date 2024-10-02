export const getTasks = () => {
    return JSON.parse(localStorage.getItem('tasks')) || [];
  };
  
  export const addTask = (newTask) => {
    const tasks = getTasks();
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  export const deleteTask = (id) => {
    const tasks = getTasks().filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  export const updateTask = (updatedTask) => {
    const tasks = getTasks().map(task => task.id === updatedTask.id ? updatedTask : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  
  export const markTaskComplete = (id) => {
    const tasks = getTasks().map(task => task.id === id ? { ...task, completed: true } : task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };
  