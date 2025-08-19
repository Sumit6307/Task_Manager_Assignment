import { Link } from 'react-router-dom';

function UserItem({ user }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-semibold">{user.email}</h3>
          <p className="text-sm text-gray-500 capitalize">{user.role}</p>
        </div>
        <div className="flex space-x-2">
          <Link
            to={`/users/${user._id}/edit`}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserItem;