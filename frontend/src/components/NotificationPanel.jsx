import React from 'react';
import { useApp } from '../context/AppContext';

export default function NotificationPanel({ show, onClose }) {
  const { notifications, markNotificationAsRead, markAllNotificationsAsRead } = useApp();

  if (!show) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'comment': return '💬';
      case 'vote': return '⬆️';
      case 'answer': return '✅';
      case 'post': return '📝';
      default: return '🔔';
    }
  };

  return (
    <div className="notification-panel-overlay" onClick={onClose}>
      <div className="notification-panel" onClick={(e) => e.stopPropagation()}>
        <div className="notification-header">
          <h3>Notifications</h3>
          {unreadCount > 0 && (
            <button onClick={markAllNotificationsAsRead} className="mark-all-read">
              Mark all as read
            </button>
          )}
          <span className="close-panel" onClick={onClose}>&times;</span>
        </div>

        <div className="notification-list">
          {notifications.length === 0 ? (
            <div className="no-notifications">
              <p>No notifications yet</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : 'unread'}`}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <span className="notification-icon">
                  {getNotificationIcon(notification.type)}
                </span>
                <div className="notification-content">
                  <p>{notification.message}</p>
                  <span className="notification-time">{notification.time}</span>
                </div>
                {!notification.read && <span className="unread-indicator"></span>}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
