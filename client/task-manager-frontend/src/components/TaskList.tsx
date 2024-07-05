import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Task {
  id: string;
  name: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch('/api/tasks')
      .then(response => response.json())
      .then(data => setTasks(data));
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
