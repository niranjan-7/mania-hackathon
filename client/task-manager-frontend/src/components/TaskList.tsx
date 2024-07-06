import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import io from 'socket.io-client';
import { format } from 'date-fns';
import { useUser } from '@clerk/clerk-react';

interface Task {
  _id: string;
  name: string;
  creatorEmail: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  collaborators: string[];
  viewers: string[];
}

const TaskList: React.FC = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  useEffect(() => {
    if (isSignedIn && isLoaded) {
      setCurrentUserEmail(user?.primaryEmailAddress?.emailAddress ?? null);
    }
  }, [isSignedIn, isLoaded, user]);

  useEffect(() => {
    fetch('http://localhost:5000/api/tasks')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setTasks(data);
        console.log(data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });

    // Uncomment these lines to enable real-time updates via socket.io
    // const socket = io();
    // socket.on('taskCreated', (task: Task) => {
    //   setTasks(prevTasks => [...prevTasks, task]);
    // });
    // socket.on('taskUpdated', (updatedTask: Task) => {
    //   setTasks(prevTasks =>
    //     prevTasks.map(task => (task._id === updatedTask._id ? updatedTask : task))
    //   );
    // });
    // socket.on('taskDeleted', (deletedTask: Task) => {
    //   setTasks(prevTasks => prevTasks.filter(task => task._id !== deletedTask._id));
    // });
    // return () => {
    //   socket.disconnect();
    // };
  }, [currentUserEmail]);

  const deleteTask = async (taskId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (!confirmed) return;

    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <TaskListContainer>
      <Title>Tasks</Title>
      <TaskTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Task Creator</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Collaborators</th>
            <th>Viewers</th>
            <th>View</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task._id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.creatorEmail}</td>
              <td>{format(new Date(task.dueDate), 'PP')}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>{task.collaborators.join(', ')}</td>
              <td>{task.viewers.join(', ')}</td>
              <td>
                <StyledLink to={`${task._id}`}>View</StyledLink>
              </td>
              <td>
                <StyledLink to={`edit/${task._id}`}>Edit</StyledLink>
              </td>
              <td>
                <DeleteButton
                  onClick={() => deleteTask(task._id)}
                  disabled={currentUserEmail !== task.creatorEmail}
                >
                  Delete
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </TaskTable>
    </TaskListContainer>
  );
};

const TaskListContainer = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const TaskTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th, td {
    padding: 10px;
    text-align: left;
    border: 1px solid #ddd;
  }

  th {
    background-color: #f4f4f4;
  }

  tbody tr:nth-child(odd) {
    background-color: #f9f9f9;
  }

  tbody tr:hover {
    background-color: #f1f1f1;
  }
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButton = styled.button`
  color: #fff;
  background-color: #dc3545;
  border: none;
  padding: 5px 10px;
  cursor: pointer;

  &:hover {
    background-color: #c82333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export default TaskList;
