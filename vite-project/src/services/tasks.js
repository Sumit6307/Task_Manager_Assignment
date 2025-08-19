import axios from 'axios';

const API_URL = '/api/v1/tasks';

// Get all tasks
const getTasks = async (filters = {}) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      params: filters
    });
    return response.data.data || [];
  } catch (err) {
    console.error('Error fetching tasks:', err);
    throw err;
  }
};

// Get single task
const getTask = async (id) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.data;
  } catch (err) {
    console.error('Error fetching task:', err);
    throw err;
  }
};

// Create task
const createTask = async (taskData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.post(API_URL, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  } catch (err) {
    console.error('Error creating task:', err);
    throw err;
  }
};

// Update task
const updateTask = async (id, taskData) => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.put(`${API_URL}/${id}`, taskData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data.data;
  } catch (err) {
    console.error('Error updating task:', err);
    throw err;
  }
};

// Delete task
const deleteTask = async (id) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  } catch (err) {
    console.error('Error deleting task:', err);
    throw err;
  }
};

export default {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
};