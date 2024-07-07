import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from './TaskForm';
import { useUser } from '@clerk/clerk-react';



const EditTask: React.FC = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const [initialTask, setInitialTask] = useState(null);
  const { user, isLoaded } = useUser();

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

  const handleEditTask = async (updatedTask: any) => {
    try {
      await axios.put(`http://localhost:5000/api/tasks/${taskId}`, updatedTask);
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
    ) : (
      <>Loading</>
    )
  );
};

export default EditTask;
