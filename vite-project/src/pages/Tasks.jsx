import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskContext from '../context/TaskContext';
import TaskList from '../components/tasks/TaskList';
import Filter from '../components/ui/Filter';
import Loading from '../components/ui/Loading';

export default function Tasks() {
  const { tasks, getTasks, isLoading } = useContext(TaskContext);

  useEffect(() => {
    getTasks();
  }, []);

  const handleFilterChange = (filters) => {
    getTasks(filters);
  };

  if (isLoading && !tasks.length) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Tasks</h1>
        <Link
          to="/tasks/new"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Task
        </Link>
      </div>

      <Filter onFilterChange={handleFilterChange} />
      <TaskList tasks={tasks} />
    </div>
  );
}