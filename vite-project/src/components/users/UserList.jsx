import { useContext, useEffect } from 'react';
import UserItem from './UserItem';
import UserContext from '../../context/UserContext';
import Loading from '../ui/Loading';

function UserList() {
  const { users, getUsers, isLoading } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

  if (isLoading && !users.length) {
    return <Loading />;
  }

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <UserItem key={user._id} user={user} />
      ))}
    </div>
  );
}

export default UserList;