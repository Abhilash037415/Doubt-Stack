// src/components/Sidebar.jsx
import { Link, NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>DoubtStack</h2>
      <nav>
        <NavLink to="/home" className="nav-link">🏠 Home</NavLink>
        <NavLink to="/recent-activity" className="nav-link">🕐 Recent</NavLink>
        <NavLink to="/customize-feed" className="nav-link">⚙️ Customize Feed</NavLink>
        <NavLink to="/study-groups" className="nav-link">👥 Study Groups</NavLink>
        <NavLink to="/department-posts" className="nav-link">🏫 Department Posts</NavLink>
        <NavLink to="/saved-posts" className="nav-link">⭐ Saved Posts</NavLink>
      </nav>

      <div className="sidebar-footer">
        <NavLink to="/profile" className="nav-link">👤 Profile</NavLink>
        <Link to="/" className="nav-link logout">🚪 Logout</Link>
      </div>
    </div>
  );
}

export default Sidebar;
