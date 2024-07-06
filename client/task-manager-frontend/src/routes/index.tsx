import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <div>
      <>index-route component</>
      <div>
        <ul>
          <li><Link to="/sign-in">Sign In</Link></li>
          <li><Link to="/dashboard/tasks">Dashboard</Link></li>
        </ul>
      </div>
    </div>
  )
}