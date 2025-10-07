import React from "react";
import { useApp } from "../context/AppContext";

export default function Topbar({ onSearch, openModal, onNotificationClick }) {
  const { notifications } = useApp();
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="topbar">
      <input
        type="text"
        placeholder="🔍 Search posts, users, or topics..."
        className="search-bar"
        onChange={(e) => onSearch(e.target.value)}
      />
      <div className="top-icons">
        <span
          title="Notifications"
          onClick={onNotificationClick}
          className="notification-icon"
        >
          🔔
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </span>
        <span title="Create Post" onClick={openModal}>
          ➕
        </span>
        <span title="Messages" onClick={() => alert("Messages feature coming soon!")}>
          💬
        </span>
        <span title="Profile">👤</span>
      </div>
    </div>
  );
}
