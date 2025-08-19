import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

function Sidebar() {
  const { user } = useContext(AuthContext);

  if (!user) return null;

  return (
    <div className="w-64 bg-gray-800 text-white p-4 hidden md:block">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Menu</h2>
      </div>
      <nav className="space-y-2">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          Tasks
        </NavLink>
        {user.role === 'admin' && (
          <NavLink
            to="/users"
            className={({ isActive }) =>
              `block px-4 py-2 rounded hover:bg-gray-700 ${
                isActive ? 'bg-gray-700' : ''
              }`
            }
          >
            Users
          </NavLink>
        )}
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `block px-4 py-2 rounded hover:bg-gray-700 ${
              isActive ? 'bg-gray-700' : ''
            }`
          }
        >
          Profile
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;