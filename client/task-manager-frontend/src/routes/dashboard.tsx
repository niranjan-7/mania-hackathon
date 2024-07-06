import { Link } from "react-router-dom";
import TaskList from "../components/TaskList";
import NotificationComponent from "../components/Notifications";

export default function DashboardPage() {
  return (
    <>
      <>Dashboard component</>
      <ul>
        <li><Link to="/">Return to index</Link></li>
        <><TaskList /></>
        <><NotificationComponent/> </>
      </ul>
    </>
  );
}