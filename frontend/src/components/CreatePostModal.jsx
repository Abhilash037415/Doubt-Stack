import { useState } from "react";

function CreatePostModal({ onClose }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Post created successfully!");
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} rows="5" required />
          </div>
          <div className="form-group">
            <label>Tags (comma-separated)</label>
            <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Post Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)} required>
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

export default CreatePostModal;
