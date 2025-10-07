import React, { useState } from "react";
import "../pages/style.css";
import { useApp } from "../context/AppContext";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Post from "../components/Post";
import CreatePostModal from "../components/CreatePostModal";
import UserProfile from "../components/UserProfile";
import NotificationPanel from "../components/NotificationPanel";

export default function Landing() {
  const { posts, savedPosts } = useApp();
  const [activeSection, setActiveSection] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterTag, setFilterTag] = useState("");

  const filterPosts = (postsList) => {
    let filtered = postsList;

    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
          p.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filterDepartment !== "all") {
      filtered = filtered.filter(p => p.department === filterDepartment);
    }

    if (filterTag) {
      filtered = filtered.filter(p =>
        p.tags.some(tag => tag.toLowerCase().includes(filterTag.toLowerCase()))
      );
    }

    return filtered;
  };

  const departments = [...new Set(posts.map(p => p.department))];
  const allTags = [...new Set(posts.flatMap(p => p.tags))];

  const getSavedPosts = () => {
    return posts.filter(post => savedPosts.includes(post.id));
  };

  const getRecentPosts = () => {
    return [...posts].sort((a, b) => b.id - a.id).slice(0, 10);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <div id="home-section" className="section active">
            <div className="welcome-banner">
              <h1>Welcome to DoubtStack</h1>
              <p>Ask questions, share knowledge, and connect with classmates</p>
              <button className="cta-button" onClick={() => setShowModal(true)}>
                Ask Your First Question
              </button>
            </div>

            <div className="filters-section">
              <div className="filter-group">
                <label>Department:</label>
                <select
                  value={filterDepartment}
                  onChange={(e) => setFilterDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div className="filter-group">
                <label>Filter by tag:</label>
                <input
                  type="text"
                  placeholder="Enter tag..."
                  value={filterTag}
                  onChange={(e) => setFilterTag(e.target.value)}
                />
              </div>
            </div>

            <div className="posts">
              {filterPosts(posts).length === 0 ? (
                <div className="no-posts">
                  <p>No posts found. Be the first to post!</p>
                </div>
              ) : (
                filterPosts(posts).map((post) => (
                  <Post key={post.id} {...post} />
                ))
              )}
            </div>
          </div>
        );

      case "recent":
        return (
          <div className="section active">
            <h2>Recent Activity</h2>
            <div className="posts">
              {getRecentPosts().map((post) => (
                <Post key={post.id} {...post} />
              ))}
            </div>
          </div>
        );

      case "saved":
        return (
          <div className="section active">
            <h2>Saved Posts</h2>
            <div className="posts">
              {getSavedPosts().length === 0 ? (
                <p>You haven't saved any posts yet</p>
              ) : (
                getSavedPosts().map((post) => (
                  <Post key={post.id} {...post} />
                ))
              )}
            </div>
          </div>
        );

      case "department":
        return (
          <div className="section active">
            <h2>Department Posts</h2>
            <div className="department-filters">
              {departments.map(dept => (
                <button
                  key={dept}
                  className="dept-filter-btn"
                  onClick={() => {
                    setFilterDepartment(dept);
                    setActiveSection("home");
                  }}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>
        );

      case "feed":
        return (
          <div className="section active">
            <h2>Customize Your Feed</h2>
            <div className="feed-customization">
              <h3>Popular Tags</h3>
              <div className="tag-list">
                {allTags.map(tag => (
                  <span
                    key={tag}
                    className="tag clickable"
                    onClick={() => {
                      setFilterTag(tag);
                      setActiveSection("home");
                    }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
              <h3>Departments</h3>
              <div className="department-list">
                {departments.map(dept => (
                  <div key={dept} className="department-item">
                    <span>{dept}</span>
                    <span className="post-count">
                      {posts.filter(p => p.department === dept).length} posts
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "groups":
        return (
          <div className="section active">
            <h2>Study Groups</h2>
            <p>Study groups feature coming soon! Create and join groups to collaborate with peers.</p>
          </div>
        );

      case "profile":
        return (
          <div className="section active">
            <UserProfile />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="home-page">
      <Sidebar setActiveSection={setActiveSection} />

      <div className="main-content">
        <Topbar
          onSearch={setSearchTerm}
          openModal={() => setShowModal(true)}
          onNotificationClick={() => setShowNotifications(true)}
        />

        <div className="content-area">
          {renderSection()}
        </div>
      </div>

      <CreatePostModal show={showModal} onClose={() => setShowModal(false)} />
      <NotificationPanel
        show={showNotifications}
        onClose={() => setShowNotifications(false)}
      />
    </div>
  );
}
