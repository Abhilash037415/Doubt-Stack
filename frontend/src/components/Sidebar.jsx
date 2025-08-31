import React from "react";

export default function Sidebar({ setActiveSection }) {
  return (
    <div className="sidebar">
      <h2>DoubtStack</h2>
      <nav>
        <button className="nav-link" onClick={() => setActiveSection("home")}>
          🏠 Home
        </button>
        <button className="nav-link" onClick={() => setActiveSection("recent")}>
          🕐 Recent
        </button>
        <button className="nav-link" onClick={() => setActiveSection("feed")}>
          ⚙️ Customize Feed
        </button>
        <button className="nav-link" onClick={() => setActiveSection("groups")}>
          👥 Study Groups
        </button>
        <button className="nav-link" onClick={() => setActiveSection("department")}>
          🏫 Department Posts
        </button>
        <button className="nav-link" onClick={() => setActiveSection("saved")}>
          ⭐ Saved Posts
        </button>
      </nav>
      <div className="sidebar-footer">
        <button className="nav-link" onClick={() => setActiveSection("profile")}>
          👤 Profile
        </button>
        <a href="index.html" className="nav-link logout">
          🚪 Logout
        </a>
      </div>
    </div>
  );
}
