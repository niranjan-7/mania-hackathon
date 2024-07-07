import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';
import { io } from 'socket.io-client';
import { API_SERVER } from '../config/api';



const TaskDetail: React.FC= () => {
  const { taskId } = useParams<{ taskId: string }>();
  const [task, setTask] = useState<any>(null);
  const socket = io(API_SERVER+'/');


  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${taskId}`);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };
    fetchTask();

    // Socket.io listener for task updates
    socket.on('taskUpdated', (updatedTask: any) => {
      if (updatedTask._id === taskId) {
        setTask(updatedTask);
      }
    });

    return () => {
      socket.off('taskUpdated');
    };
  }, [taskId, socket]);

  if (!task) {
    return <div>Loading task...</div>;
  }

  return (
    <div>
      <h2>{task.name}</h2>
      <p>Creator: {task.creatorEmail}</p>
      <p>Description: {task.description}</p>
      <p>Due Date: {format(new Date(task.dueDate), 'yyyy-MM-dd')}</p>
      <p>Priority: {task.priority}</p>
      <p>Status: {task.status}</p>
      {/* Display other task details */}
    </div>
  );
};

export default TaskDetail;
