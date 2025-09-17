import React, { useState } from "react";
import "./style.css";

const RecentActivity = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Sample activity data (in real app, fetch from backend)
  const activities = [
    {
      id: "react-hooks",
      type: "posts",
      icon: "📝",
      text: 'You posted "React Hooks vs Class Components"',
      description:
        "A detailed comparison of React Hooks and Class Components with practical examples and performance considerations...",
      time: "3 hours ago",
      stats: "12 upvotes • 5 comments • 3 saves",
      department: "Computer Science",
      actions: ["view", "edit", "share"],
    },
    {
      id: "js-arrays",
      type: "comments",
      icon: "💬",
      text: 'You commented on "JavaScript Array Methods"',
      description:
        '"Great explanation! I\'d also recommend looking at the reduce() method for more complex transformations..."',
      time: "5 hours ago",
      stats: "8 upvotes • 2 replies",
      department: "by @sarah_js",
      actions: ["view", "edit"],
    },
    {
      id: "ml-basics",
      type: "votes",
      icon: "⬆️",
      text: 'You upvoted "Machine Learning Basics"',
      description:
        "A comprehensive guide to getting started with machine learning including Python libraries and basic algorithms.",
      time: "1 day ago",
      stats: "by @prof_ml",
      department: "Data Science",
      actions: ["view", "save"],
    },
    {
      id: "db-design",
      type: "posts",
      icon: "📝",
      text: 'You posted "Database Design Best Practices"',
      description:
        "Essential guidelines for designing efficient and scalable database schemas with normalization examples...",
      time: "2 days ago",
      stats: "28 upvotes • 12 comments • 8 saves",
      department: "Computer Science",
      actions: ["view", "edit", "share"],
    },
    {
      id: "pandas-analysis",
      type: "saves",
      icon: "⭐",
      text: 'You saved "Python Data Analysis with Pandas"',
      description:
        "Complete tutorial on data analysis using Pandas library with real-world examples and exercises.",
      time: "3 days ago",
      stats: "by @data_analyst",
      department: "Data Science",
      actions: ["view", "unsave"],
    },
    {
      id: "algo-complexity",
      type: "comments",
      icon: "💬",
      text: 'You received a reply on "Algorithm Time Complexity"',
      description:
        '"@student123 Thanks for the clarification on O(log n) vs O(n log n)! This really helped me understand..."',
      time: "4 days ago",
      stats: "by @confused_coder",
      department: "Computer Science",
      actions: ["view", "reply"],
    },
    {
      id: "web-security",
      type: "posts",
      icon: "📝",
      text: 'You posted "Web Security Fundamentals"',
      description:
        "Important security practices every web developer should know including HTTPS, XSS prevention, and authentication...",
      time: "1 week ago",
      stats: "45 upvotes • 18 comments • 15 saves",
      department: "Computer Science",
      actions: ["view", "edit", "share"],
    },
  ];

  // Filter + search
  const filteredActivities = activities.filter((item) => {
    const matchesFilter = filter === "all" || item.type === filter;
    const matchesSearch =
      item.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Action handlers
  const handleAction = (type, id) => {
    switch (type) {
      case "view":
        alert(`Viewing ${id}`);
        break;
      case "edit":
        alert(`Editing ${id}`);
        break;
      case "share":
        navigator.clipboard.writeText(`https://doubtstack.com/post/${id}`);
        alert("Link copied to clipboard!");
        break;
      case "save":
        alert(`Saved ${id}`);
        break;
      case "unsave":
        alert(`Removed ${id} from saved`);
        break;
      case "reply":
        alert(`Replying to ${id}`);
        break;
      default:
        break;
    }
  };

  return (
    <div className="home-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>DoubtStack</h2>
        <nav>
          <a href="/home" className="nav-link">
            🏠 Home
          </a>
          <a href="/recent" className="nav-link active">
            🕐 Recent
          </a>
          <a href="/customize-feed" className="nav-link">
            ⚙️ Customize Feed
          </a>
          <a href="/study-groups" className="nav-link">
            👥 Study Groups
          </a>
          <a href="/department-posts" className="nav-link">
            🏫 Department Posts
          </a>
          <a href="/saved-posts" className="nav-link">
            ⭐ Saved Posts
          </a>
        </nav>

        <div className="sidebar-footer">
          <a href="/profile" className="nav-link">
            👤 Profile
          </a>
          <a href="/" className="nav-link logout">
            🚪 Logout
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Topbar */}
        <div className="topbar">
          <input
            type="text"
            placeholder="🔍 Search recent activity..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="top-icons">
            <span title="Notifications" onClick={() => alert("Notifications")}>
              🔔
            </span>
            <span title="Create Post" onClick={() => alert("Create Post")}>
              ➕
            </span>
            <span title="Messages" onClick={() => alert("Messages")}>
              💬
            </span>
            <span
              title="Profile"
              onClick={() => (window.location.href = "/profile")}
            >
              👤
            </span>
          </div>
        </div>

        {/* Section Header */}
        <div className="content-area">
          <div className="section-header">
            <h1>🕐 Recent Activity</h1>
            <p>Your latest posts and interactions</p>
            <div className="activity-stats">
              <div className="stat-item">
                <span className="stat-number">15</span>
                <span className="stat-label">Posts This Week</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">42</span>
                <span className="stat-label">Comments</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">128</span>
                <span className="stat-label">Reputation Points</span>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="filter-tabs">
            {["all", "posts", "comments", "votes", "saves"].map((t) => (
              <button
                key={t}
                className={`filter-tab ${filter === t ? "active" : ""}`}
                onClick={() => setFilter(t)}
              >
                {t === "all"
                  ? "All Activity"
                  : `My ${t.charAt(0).toUpperCase() + t.slice(1)}`}
              </button>
            ))}
          </div>

          {/* Activity List */}
          <div className="activity-list">
            {filteredActivities.map((item) => (
              <div className="activity-item" key={item.id}>
                <div className="activity-icon">{item.icon}</div>
                <div className="activity-content">
                  <div className="activity-text">{item.text}</div>
                  <div className="activity-description">
                    {item.description}
                  </div>
                  <div className="activity-meta">
                    <span className="activity-time">{item.time}</span>
                    <span className="activity-stats">{item.stats}</span>
                    <span className="activity-department">
                      {item.department}
                    </span>
                  </div>
                  <div className="activity-actions">
                    {item.actions.map((act) => (
                      <button
                        key={act}
                        className="action-btn"
                        onClick={() => handleAction(act, item.id)}
                      >
                        {act === "view" && "👁️ View"}
                        {act === "edit" && "✏️ Edit"}
                        {act === "share" && "📤 Share"}
                        {act === "save" && "⭐ Save"}
                        {act === "unsave" && "🗑️ Remove"}
                        {act === "reply" && "↩️ Reply"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <div className="load-more-container">
            <button
              className="load-more-btn"
              onClick={() => alert("Loading more activity...")}
            >
              📄 Load More Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;
