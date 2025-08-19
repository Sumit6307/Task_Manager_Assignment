import { format } from 'date-fns';

function TaskItem({ task }) {
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{task.title}</h3>
          <p className="text-gray-600 line-clamp-2">{task.description}</p>
        </div>
        <div className="flex space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor()}`}>
            {task.priority}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor()}`}>
            {task.status}
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-500">
            Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </p>
          <p className="text-sm text-gray-500">
            Assigned to: {task.assignedTo?.email || 'Unassigned'}
          </p>
        </div>
        {task.documents?.length > 0 && (
          <div className="text-sm text-gray-500">
            {task.documents.length} document{task.documents.length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
}

export default TaskItem;