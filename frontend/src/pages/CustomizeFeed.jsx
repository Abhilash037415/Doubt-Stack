import React, { useState, useEffect } from "react";
import "./style.css"; // ✅ keep your CSS here

function CustomizeFeed() {
  // ✅ States
  const [subjects, setSubjects] = useState({
    "computer-science": true,
    mathematics: true,
    physics: false,
    chemistry: false,
    electronics: true,
    mechanical: false,
    civil: false,
    "data-science": false,
    "web-development": true,
    "mobile-development": false,
  });

  const [contentTypes, setContentTypes] = useState({
    questions: true,
    discussions: true,
    resources: true,
    announcements: false,
    projects: true,
    tutorials: false,
  });

  const [settings, setSettings] = useState({
    sortBy: "recent",
    postAge: "all",
    minVotes: 0,
    postsPerPage: 20,
    notifications: true,
    hideVoted: false,
    autoFollow: true,
    emailDigest: false,
    infiniteScroll: true,
    darkMode: false,
  });

  // ✅ Load saved settings from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("feedSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSubjects(
          Object.fromEntries(Object.keys(subjects).map((s) => [s, parsed.subjects?.includes(s)]))
        );
        setContentTypes(
          Object.fromEntries(Object.keys(contentTypes).map((c) => [c, parsed.contentTypes?.includes(c)]))
        );
        setSettings((prev) => ({
          ...prev,
          ...parsed,
        }));
      } catch (err) {
        console.error("Error loading settings:", err);
      }
    }
  }, []);

  // ✅ Handlers
  const toggleSubject = (sub) => {
    setSubjects({ ...subjects, [sub]: !subjects[sub] });
  };

  const toggleContent = (c) => {
    setContentTypes({ ...contentTypes, [c]: !contentTypes[c] });
  };

  const handleSettingChange = (key, value) => {
    setSettings({ ...settings, [key]: value });
  };

  const saveSettings = () => {
    const toSave = {
      subjects: Object.keys(subjects).filter((s) => subjects[s]),
      contentTypes: Object.keys(contentTypes).filter((c) => contentTypes[c]),
      ...settings,
    };
    localStorage.setItem("feedSettings", JSON.stringify(toSave));
    alert("✅ Settings saved successfully!");
  };

  const resetToDefaults = () => {
    if (window.confirm("Reset settings to defaults?")) {
      setSubjects({
        "computer-science": true,
        mathematics: true,
        physics: false,
        chemistry: false,
        electronics: true,
        mechanical: false,
        civil: false,
        "data-science": false,
        "web-development": true,
        "mobile-development": false,
      });
      setContentTypes({
        questions: true,
        discussions: true,
        resources: true,
        announcements: false,
        projects: true,
        tutorials: false,
      });
      setSettings({
        sortBy: "recent",
        postAge: "all",
        minVotes: 0,
        postsPerPage: 20,
        notifications: true,
        hideVoted: false,
        autoFollow: true,
        emailDigest: false,
        infiniteScroll: true,
        darkMode: false,
      });
      alert("✅ Reset to defaults!");
    }
  };

  return (
    <div className="main-content">
      {/* ✅ Topbar */}
      <div className="topbar">
        <input type="text" placeholder="🔍 Search settings..." className="search-bar" />
        <div className="top-icons">
          <span title="Notifications">🔔</span>
          <span title="Create Post">➕</span>
          <span title="Messages">💬</span>
          <span title="Profile">👤</span>
        </div>
      </div>

      <div className="content-area">
        <div className="section-header">
          <h1>⚙️ Customize Feed</h1>
          <p>Personalize your content preferences</p>
          <div className="quick-actions">
            <button className="quick-btn" onClick={resetToDefaults}>
              🔄 Reset to Defaults
            </button>
            <button className="quick-btn">📥 Import Settings</button>
            <button className="quick-btn">📤 Export Settings</button>
          </div>
        </div>

        {/* ✅ Subject Preferences */}
        <div className="customization-card">
          <div className="card-header">
            <h3>📚 Subject Preferences</h3>
            <p>Choose subjects you're interested in</p>
          </div>
          <div className="subject-tags">
            {Object.keys(subjects).map((sub) => (
              <label key={sub} className="tag-checkbox">
                <input
                  type="checkbox"
                  checked={subjects[sub]}
                  onChange={() => toggleSubject(sub)}
                />
                <span className="tag">{sub}</span>
              </label>
            ))}
          </div>
        </div>

        {/* ✅ Content Types */}
        <div className="customization-card">
          <div className="card-header">
            <h3>📋 Content Types</h3>
          </div>
          <div className="content-types">
            {Object.keys(contentTypes).map((c) => (
              <label key={c} className="type-option">
                <input type="checkbox" checked={contentTypes[c]} onChange={() => toggleContent(c)} />
                <div className="type-card">
                  <span className="type-label">{c}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* ✅ Feed Settings */}
        <div className="customization-card">
          <div className="card-header">
            <h3>🎚️ Feed Settings</h3>
          </div>
          <div className="feed-settings">
            <label>
              Sort by:
              <select
                value={settings.sortBy}
                onChange={(e) => handleSettingChange("sortBy", e.target.value)}
              >
                <option value="recent">Most Recent</option>
                <option value="popular">Most Popular</option>
                <option value="unanswered">Unanswered First</option>
              </select>
            </label>

            <label>
              Show posts from:
              <select
                value={settings.postAge}
                onChange={(e) => handleSettingChange("postAge", e.target.value)}
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">Last Week</option>
              </select>
            </label>

            <label>
              Min Votes:
              <input
                type="range"
                min="0"
                max="50"
                value={settings.minVotes}
                onChange={(e) => handleSettingChange("minVotes", e.target.value)}
              />
              {settings.minVotes} votes
            </label>
          </div>
        </div>

        {/* ✅ Save Section */}
        <div className="save-section">
          <button className="save-settings-btn" onClick={saveSettings}>
            💾 Save All Preferences
          </button>
          <button className="reset-btn" onClick={resetToDefaults}>
            🔄 Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomizeFeed;
