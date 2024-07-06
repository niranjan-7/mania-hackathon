import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

interface Task {
  _id: string;
  name: string;
  description: string;
  dueDate: string; // Assuming dueDate is a string, adjust as per your schema
  priority: string;
  status: string;
  creatorEmail: string;
  collaborators: string[];
  viewers: string[];
}

const TaskDetail: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>(); // Extracts taskId from URL params
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null >(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`); // Adjust API endpoint as per your backend
        if (!response.ok) {
          throw new Error('Failed to fetch task');
        }
        const taskData: Task = await response.json();
        setTask(taskData);
      } catch (error:any) {
        console.error('Error fetching task:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId]);

  if (loading) {
    return <p>Loading task...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Task Details</h2>
      {task ? (
        <div>
          <p><strong>Name:</strong> {task.name}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Due Date:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
          <p><strong>Priority:</strong> {task.priority}</p>
          <p><strong>Status:</strong> {task.status}</p>
          <p><strong>Creator Email:</strong> {task.creatorEmail}</p>
          <div>
            <strong>Collaborators:</strong>
            <ul>
              {task.collaborators.map((collaborator, index) => (
                <li key={index}>{collaborator}</li>
              ))}
            </ul>
          </div>
          <div>
            <strong>Viewers:</strong>
            <ul>
              {task.viewers.map((viewer, index) => (
                <li key={index}>{viewer}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p>Task not found</p>
      )}
    </div>
  );
};

export default TaskDetail;
