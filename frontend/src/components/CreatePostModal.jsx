import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function CreatePostModal({ show, onClose }) {
  const { createPost, addNotification } = useApp();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    tags: '',
    type: ''
  });

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const tagsArray = formData.tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);

    const newPost = createPost({
      title: formData.title,
      content: formData.content,
      tags: tagsArray,
      type: formData.type.charAt(0).toUpperCase() + formData.type.slice(1)
    });

    addNotification({
      type: 'post',
      message: 'Your post has been published successfully!'
    });

    setFormData({ title: '', content: '', tags: '', type: '' });
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
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="What's your question or topic?"
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Provide more details..."
              rows="5"
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., JavaScript, React, Assignment"
            />
          </div>
          <div className="form-group">
            <label>Post Type</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
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
