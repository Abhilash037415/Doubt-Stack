import React from "react";

export default function Topbar({ onSearch, openModal }) {
  return (
    <div className="topbar">
      <input
        type="text"
        placeholder="🔍 Search posts, users, or topics..."
        className="search-bar"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="top-icons">
        <span title="Notifications" onClick={() => alert("Notifications panel would open here")}>
          🔔
        </span>
        <span title="Create Post" onClick={openModal}>
          ➕
        </span>
        <span title="Messages" onClick={() => alert("Messages panel would open here")}>
          💬
        </span>
        <span title="Profile" onClick={() => alert("Go to profile")}>👤</span>
      </div>
    </div>
  );
}
