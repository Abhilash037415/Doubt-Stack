// src/pages/StudyGroups.jsx
import React, { useState } from "react";
import "./style.css";

function StudyGroups() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [previewData, setPreviewData] = useState(null);

  // Groups (dummy data for now)
  const groups = [
    {
      id: "web-dev",
      name: "Web Development Study Group",
      subject: "computer-science",
      category: "joined",
      stats: "24 members • 156 posts • Active",
      description:
        "Learn modern web technologies together! We cover HTML, CSS, JavaScript, React, Node.js, and full-stack development.",
      topics: ["#HTML", "#CSS", "#JavaScript", "#React", "#NodeJS"],
      latest: "React Router vs Next.js routing",
      time: "2 hours ago",
      joined: true,
    },
    {
      id: "ml",
      name: "Machine Learning Enthusiasts",
      subject: "computer-science",
      category: "popular",
      stats: "145 members • 423 posts • Very Active",
      description:
        "Explore ML algorithms, discuss research papers, work on AI projects, and stay updated with the latest trends.",
      topics: ["#Python", "#TensorFlow", "#PyTorch", "#NLP", "#DeepLearning"],
      latest: "GPT vs BERT for text classification",
      time: "45 minutes ago",
      joined: false,
    },
    // ... add rest of your groups here
  ];

  // Filtering
  const filteredGroups = groups.filter((g) => {
    const matchCategory =
      activeFilter === "all" || g.category === activeFilter;
    const matchSubject =
      subjectFilter === "" || g.subject === subjectFilter;
    const matchSearch =
      g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.topics.some((t) =>
        t.toLowerCase().includes(searchTerm.toLowerCase())
      );

    return matchCategory && matchSubject && matchSearch;
  });

  // Handlers
  const handleJoin = (groupId) => {
    alert(`✅ Joined ${groupId}`);
  };

  const handleLeave = (groupId) => {
    alert(`🚪 Left ${groupId}`);
  };

  const handlePreview = (group) => {
    setPreviewData(group);
    setShowPreviewModal(true);
  };

  return (
    <div className="home-page">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>DoubtStack</h2>
        <nav>
          <a href="/home" className="nav-link">🏠 Home</a>
          <a href="/recent" className="nav-link">🕐 Recent</a>
          <a href="/customize" className="nav-link">⚙️ Customize Feed</a>
          <a href="/groups" className="nav-link active">👥 Study Groups</a>
          <a href="/departments" className="nav-link">🏫 Department Posts</a>
          <a href="/saved" className="nav-link">⭐ Saved Posts</a>
        </nav>
        <div className="sidebar-footer">
          <a href="/profile" className="nav-link">👤 Profile</a>
          <a href="/" className="nav-link logout">🚪 Logout</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content">
        <div className="topbar">
          <input
            type="text"
            placeholder="🔍 Search study groups..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="top-icons">
            <span onClick={() => alert("Notifications")}>🔔</span>
            <span onClick={() => setShowCreateModal(true)}>➕</span>
            <span onClick={() => alert("Messages")}>💬</span>
            <span onClick={() => (window.location.href = "/profile")}>👤</span>
          </div>
        </div>

        <div className="content-area">
          <div className="section-header">
            <h1>👥 Study Groups</h1>
            <p>Join or create study groups with your classmates</p>
            <div className="header-actions">
              <button
                className="create-group-btn"
                onClick={() => setShowCreateModal(true)}
              >
                ➕ Create New Group
              </button>
              <button
                className="my-groups-btn"
                onClick={() => setActiveFilter("joined")}
              >
                📋 My Groups
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="groups-filter">
            {["all", "joined", "popular", "recent", "department"].map((f) => (
              <button
                key={f}
                className={`filter-btn ${activeFilter === f ? "active" : ""}`}
                onClick={() => setActiveFilter(f)}
              >
                {f === "all" ? "All Groups" : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {/* Subject Filter */}
          <div className="subject-filter">
            <select
              value={subjectFilter}
              onChange={(e) => setSubjectFilter(e.target.value)}
            >
              <option value="">All Subjects</option>
              <option value="computer-science">Computer Science</option>
              <option value="mathematics">Mathematics</option>
              <option value="electronics">Electronics</option>
              <option value="physics">Physics</option>
              <option value="chemistry">Chemistry</option>
              <option value="mechanical">Mechanical</option>
              <option value="civil">Civil</option>
            </select>
          </div>

          {/* Groups Grid */}
          <div className="groups-grid">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className={`group-card ${group.joined ? "joined-group" : "available-group"}`}
              >
                {group.joined && <div className="group-badge">✅ Joined</div>}
                {!group.joined && group.category === "popular" && (
                  <div className="group-badge popular">🔥 Popular</div>
                )}

                <div className="group-header">
                  <div className="group-avatar">👥</div>
                  <div className="group-info">
                    <h3>{group.name}</h3>
                    <p className="group-stats">{group.stats}</p>
                  </div>
                </div>

                <p className="group-description">{group.description}</p>

                <div className="group-topics">
                  {group.topics.map((t, i) => (
                    <span key={i} className="topic-tag">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="group-activity">
                  <div className="recent-activity">
                    <span className="activity-text">💬 Latest: "{group.latest}"</span>
                    <span className="activity-time">{group.time}</span>
                  </div>
                </div>

                <div className="group-actions">
                  {group.joined ? (
                    <>
                      <button
                        className="group-btn primary"
                        onClick={() => alert("Open Group")}
                      >
                        💬 Open Group
                      </button>
                      <button
                        className="group-btn danger"
                        onClick={() => handleLeave(group.id)}
                      >
                        🚪 Leave
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="group-btn primary"
                        onClick={() => handleJoin(group.id)}
                      >
                        🚪 Join Group
                      </button>
                      <button
                        className="group-btn secondary"
                        onClick={() => handlePreview(group)}
                      >
                        👁️ Preview
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowCreateModal(false)}>
              &times;
            </span>
            <h2>Create Study Group</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Group created!");
                setShowCreateModal(false);
              }}
            >
              <div className="form-group">
                <label>Group Name</label>
                <input type="text" required />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea rows="4" required></textarea>
              </div>
              <button type="submit">🎯 Create Group</button>
            </form>
          </div>
        </div>
      )}

      {/* Preview Group Modal */}
      {showPreviewModal && previewData && (
        <div className="modal">
          <div className="modal-content large">
            <span className="close" onClick={() => setShowPreviewModal(false)}>
              &times;
            </span>
            <div className="preview-header">
              <div className="preview-info">
                <h2>{previewData.name}</h2>
                <p>{previewData.stats}</p>
              </div>
              <button
                className="join-preview-btn"
                onClick={() => handleJoin(previewData.id)}
              >
                Join Group
              </button>
            </div>
            <div className="preview-content">
              <p>{previewData.description}</p>
              <div className="preview-topics">
                {previewData.topics.map((t, i) => (
                  <span key={i} className="topic-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyGroups;
