import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

interface Task {
  id: string;
  name: string;
  description: string;
  dueDate: string;
  priority: string;
  status: string;
  collaborators: string[];
  viewers: string[];
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
//   const socket = io();

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
      // Handle error state or retry mechanism if needed
    });

    // socket.on('taskCreated', (task: Task) => {
    //   setTasks(prevTasks => [...prevTasks, task]);
    // });

    // socket.on('taskUpdated', (updatedTask: Task) => {
    //   setTasks(prevTasks =>
    //     prevTasks.map(task => (task.id === updatedTask.id ? updatedTask : task))
    //   );
    // });

    // socket.on('taskDeleted', (deletedTask: Task) => {
    //   setTasks(prevTasks => prevTasks.filter(task => task.id !== deletedTask.id));
    // });

    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Collaborators</th>
            <th>Viewers</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.name}</td>
              <td>{task.description}</td>
              <td>{task.dueDate}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>{task.collaborators.join(', ')}</td>
              <td>{task.viewers.join(', ')}</td>
              <td>
                <Link to={`/task/${task.id}`}>View / Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
