import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import io from 'socket.io-client';

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
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => {
        setTasks(data);
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
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <Link to={`/task/${task.id}`}>{task.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
