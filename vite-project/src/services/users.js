import axios from 'axios';

const API_URL = '/api/v1/users';

// Get all users
const getUsers = async () => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

// Create user
const createUser = async (userData) => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.post(API_URL, userData, config);
  return response.data;
};

// Update user
const updateUser = async (id, userData) => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.put(`${API_URL}/${id}`, userData, config);
  return response.data;
};

// Delete user
const deleteUser = async (id) => {
  const token = localStorage.getItem('token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);
  return response.data;
};

const userService = {
  getUsers,
  createUser,
  updateUser,
  deleteUser
};

export default userService;