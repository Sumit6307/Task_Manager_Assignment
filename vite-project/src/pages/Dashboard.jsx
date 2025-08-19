import { useContext } from 'react';
import TaskContext from '../context/TaskContext';
import TaskList from '../components/tasks/TaskList';

function Dashboard() {
  const { tasks, getTasks, isLoading } = useContext(TaskContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold">{tasks.length}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Pending</h3>
          <p className="text-3xl font-bold">
            {tasks.filter(task => task.status === 'pending').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Completed</h3>
          <p className="text-3xl font-bold">
            {tasks.filter(task => task.status === 'completed').length}
          </p>
        </div>
      </div>
      
      <h2 className="text-xl font-semibold mb-4">Recent Tasks</h2>
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : (
        <TaskList tasks={tasks.slice(0, 5)} />
      )}
    </div>
  );
}

export default Dashboard;