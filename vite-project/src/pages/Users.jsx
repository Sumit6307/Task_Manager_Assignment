import { Link } from 'react-router-dom';
import UserList from '../components/users/UserList';

function Users() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <Link
          to="/users/new"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create User
        </Link>
      </div>
      <UserList />
    </div>
  );
}

export default Users;