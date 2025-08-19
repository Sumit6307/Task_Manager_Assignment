import { createContext, useState } from 'react';
import taskService from '../services/tasks';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getTasks = async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const tasks = await taskService.getTasks(filters);
      setTasks(tasks);
    } catch (err) {
      setError(err.message || 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  };

  const getTask = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const task = await taskService.getTask(id);
      setCurrentTask(task);
      return task;
    } catch (err) {
      setError(err.message || 'Failed to fetch task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (taskData) => {
    setIsLoading(true);
    setError(null);
    try {
      const newTask = await taskService.createTask(taskData);
      setTasks([...tasks, newTask]);
      return newTask;
    } catch (err) {
      setError(err.message || 'Failed to create task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const updateTask = async (id, taskData) => {
    setIsLoading(true);
    setError(null);
    try {
      const updatedTask = await taskService.updateTask(id, taskData);
      setTasks(tasks.map(task => task._id === id ? updatedTask : task));
      return updatedTask;
    } catch (err) {
      setError(err.message || 'Failed to update task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      await taskService.deleteTask(id);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete task');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        currentTask,
        isLoading,
        error,
        getTasks,
        getTask,
        addTask,
        updateTask,
        deleteTask
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskContext;