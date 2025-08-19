import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import TaskContext from '../context/TaskContext';
import DocumentPreview from '../components/ui/DocumentPreview';
import Loading from '../components/ui/Loading';

function TaskDetails() {
  const { id } = useParams();
  const { currentTask, getTask, deleteTask } = useContext(TaskContext);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        await getTask(id);
      } catch (err) {
        setError('Failed to fetch task details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await deleteTask(id);
        navigate('/tasks');
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!currentTask) {
    return <div className="text-center py-8">{error || 'Task not found'}</div>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Task details rendering */}
      {currentTask.dueDate && (
        <p className="text-sm text-gray-500">
          Due: {format(parseISO(currentTask.dueDate), 'MMM dd, yyyy')}
        </p>
      )}
    </div>
  );
}

export default TaskDetails;