import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../services/users';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Get all users
  const getUsers = async () => {
    setIsLoading(true);
    try {
      const userList = await userService.getUsers();
      setUsers(userList);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  // Create user
  const addUser = async (userData) => {
    setIsLoading(true);
    try {
      const newUser = await userService.createUser(userData);
      setUsers([...users, newUser]);
      navigate('/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Update user
  const updateUser = async (id, userData) => {
    setIsLoading(true);
    try {
      const updatedUser = await userService.updateUser(id, userData);
      setUsers(users.map(user => user._id === id ? updatedUser : user));
      navigate('/users');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    setIsLoading(true);
    try {
      await userService.deleteUser(id);
      setUsers(users.filter(user => user._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete user');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        isLoading,
        error,
        getUsers,
        addUser,
        updateUser,
        deleteUser
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;