import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Task Management System</h1>
        <p className="text-xl text-gray-600 mb-8">
          Organize, track, and manage your tasks efficiently
        </p>
        {!user ? (
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-6 py-3 bg-white text-blue-600 font-medium rounded-md border border-blue-600 hover:bg-blue-50"
            >
              Register
            </Link>
          </div>
        ) : (
          <Link
            to="/dashboard"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        )}
      </div>
    </div>
  );
}

export default Home;