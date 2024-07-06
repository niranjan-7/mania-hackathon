import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import io from 'socket.io-client';
import TaskForm from './TaskForm';
import { useUser } from '@clerk/clerk-react';

const socket = io('http://localhost:5000');

const EditTask: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [initialTask, setInitialTask] = useState(null);
  const { isSignedIn, user, isLoaded } = useUser();
  console.log(isSignedIn, user?.primaryEmailAddress?.emailAddress, isLoaded);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
        setInitialTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [taskId]);

  const handleEditTask = async (updatedTask:any) => {
    console.log(updatedTask)
    try {
      const response = await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask);
      socket.emit('taskUpdated', response.data);
      navigate('/dashboard/tasks');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    initialTask ? (
      <TaskForm
        initialTask={initialTask}
        onSubmit={handleEditTask}
        submitButtonText="Update"
        creatorEmail={user?.primaryEmailAddress?.emailAddress as string}
      />
    ):(<>Loading</>)
  );
};

export default EditTask;
