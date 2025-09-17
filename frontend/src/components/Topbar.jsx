function Topbar({ setShowModal }) {
  return (
    <div className="topbar">
      <input
        type="text"
        placeholder="🔍 Search posts, users, or topics..."
        className="search-bar"
      />
      <div className="top-icons">
        <span title="Notifications">🔔</span>
        <span title="Create Post" onClick={() => setShowModal(true)}>➕</span>
        <span title="Messages">💬</span>
        <span title="Profile">👤</span>
      </div>
    </div>
  );
}

export default Topbar;
