import { Link } from "react-router-dom";
import TaskList from "../components/TaskList";

export default function DashboardPage() {
  return (
    <>
      <>Dashboard component</>
      <ul>
        <li><Link to="/">Return to index</Link></li>
        <><TaskList /></>
      </ul>
    </>
  );
}