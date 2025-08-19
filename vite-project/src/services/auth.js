import axios from 'axios';

// Configure API base URL (adjust according to your backend)
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

const register = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true  // For cookies if using them
      }
    );

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    let errorMessage = 'Registration failed';
    
    if (error.response) {
      // Server responded with error status
      errorMessage = error.response.data?.message || 
                    error.response.statusText || 
                    errorMessage;
      
      // Handle specific status codes
      if (error.response.status === 409) {
        errorMessage = 'Email already exists';
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = 'No response from server - check your connection';
    } else {
      // Other errors
      errorMessage = error.message || errorMessage;
    }

    throw new Error(errorMessage);
  }
};

const login = async (userData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      userData,
      {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      }
    );

    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
    }

    return response.data;
  } catch (error) {
    let errorMessage = 'Login failed';
    
    if (error.response) {
      if (error.response.status === 401) {
        errorMessage = 'Invalid email or password';
      } else {
        errorMessage = error.response.data?.message || errorMessage;
      }
    }

    throw new Error(errorMessage);
  }
};

const logout = async () => {
  try {
    await axios.get(`${API_BASE_URL}/auth/logout`, {
      withCredentials: true
    });
    
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Failed to logout properly');
  }
};

const getMe = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    throw new Error('No authentication token found');
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    });
    return response.data;
  } catch (error) {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    
    let errorMessage = 'Failed to authenticate';
    if (error.response?.status === 401) {
      errorMessage = 'Session expired - please login again';
    }
    
    throw new Error(errorMessage);
  }
};

// Initialize axios defaults
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default {
  register,
  login,
  logout,
  getMe
};