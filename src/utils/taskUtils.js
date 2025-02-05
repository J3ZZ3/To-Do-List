import { supabase } from './supabaseClient';

export const getTasks = async () => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const addTask = async (newTask) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .insert([newTask])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  } catch (error) {
    throw error;
  }
};

export const updateTask = async (updatedTask) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update(updatedTask)
      .eq('id', updatedTask.id)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};

export const markTaskComplete = async (id) => {
  try {
    const { data, error } = await supabase
      .from('tasks')
      .update({ completed: true })
      .eq('id', id)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    throw error;
  }
};
  