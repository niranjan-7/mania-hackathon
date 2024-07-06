import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { useUser } from '@clerk/clerk-react';
import TaskForm from './TaskForm';

const socket = io('http://localhost:5000');

const CreateTask: React.FC = () => {
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();
  console.log(isSignedIn, user?.primaryEmailAddress?.emailAddress, isLoaded);

  const handleCreateTask = async (task:any) => {
    const newTask = {
      ...task,
      creatorEmail: user?.primaryEmailAddress?.emailAddress,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      socket.emit('taskCreated', response.data);
      navigate('/dashboard/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <TaskForm
      onSubmit={handleCreateTask}
      submitButtonText="Create"
      creatorEmail={user?.primaryEmailAddress?.emailAddress as string}
    />
  );
};

export default CreateTask;
