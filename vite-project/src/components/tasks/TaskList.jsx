import TaskItem from './TaskItem';

export default function TaskList({ tasks }) {
  if (!tasks || !Array.isArray(tasks)) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p>No tasks found or data format error</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p>No tasks available</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </div>
  );
}