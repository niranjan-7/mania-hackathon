import React from "react";
import { Link } from "react-router-dom";
import TaskList from "../components/TaskList";
import NotificationComponent from "../components/Notifications";



const DashboardPage : React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        <li>
          <Link to="/">Return to index</Link>
        </li>
      </ul>
      <div>
        <h2>Tasks</h2>
        <TaskList />
      </div>
      <div>
        <h2>Notifications</h2>
        <NotificationComponent />
      </div>
    </div>
  );
};

export default DashboardPage;
