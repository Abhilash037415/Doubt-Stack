import React from "react";

export default function CreatePostModal({ show, onClose }) {
  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Post created successfully!");
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" placeholder="What's your question or topic?" required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea placeholder="Provide more details..." rows="5" required></textarea>
          </div>
          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input type="text" placeholder="e.g., JavaScript, React, Assignment" />
          </div>
          <div className="form-group">
            <label>Post Type</label>
            <select required>
              <option value="">Select type</option>
              <option value="question">Question</option>
              <option value="discussion">Discussion</option>
              <option value="resource">Resource Share</option>
              <option value="announcement">Announcement</option>
            </select>
          </div>
          <button type="submit">Post Question</button>
        </form>
      </div>
    </div>
  );
}
