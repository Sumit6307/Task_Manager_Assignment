import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/auth/PrivateRoute';
import AdminRoute from '../components/auth/AdminRoute';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Tasks from '../pages/Tasks';
import TaskDetails from '../pages/TaskDetails';
import Users from '../pages/Users';
import Profile from '../pages/Profile';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/tasks" element={<PrivateRoute><Tasks /></PrivateRoute>} />
      <Route path="/tasks/:id" element={<PrivateRoute><TaskDetails /></PrivateRoute>} />
      <Route path="/users" element={<AdminRoute><Users /></AdminRoute>} />
      <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
    </Routes>
  );
};

export default AppRoutes;