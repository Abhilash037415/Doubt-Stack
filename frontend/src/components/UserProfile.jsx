import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function UserProfile() {
  const { currentUser, updateUserProfile, posts } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
    department: currentUser?.department || '',
    year: currentUser?.year || '',
    bio: currentUser?.bio || ''
  });

  const userPosts = posts.filter(post => post.userId === currentUser?.id);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserProfile(formData);
    setIsEditing(false);
  };

  if (!currentUser) {
    return (
      <div className="profile-container">
        <p>Please log in to view your profile</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header-section">
          <img src={currentUser.avatar} alt="Avatar" className="profile-avatar" />
          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{userPosts.length}</span>
              <span className="stat-label">Posts</span>
            </div>
            <div className="stat">
              <span className="stat-value">{currentUser.reputation}</span>
              <span className="stat-label">Reputation</span>
            </div>
            <div className="stat">
              <span className="stat-value">
                {userPosts.reduce((sum, post) => sum + post.votes, 0)}
              </span>
              <span className="stat-label">Total Votes</span>
            </div>
          </div>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-edit-form">
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
              />
            </div>
            <div className="form-actions">
              <button type="submit">Save Changes</button>
              <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <div className="profile-info">
            <h2>@{currentUser.username}</h2>
            <p className="profile-email">{currentUser.email}</p>
            <p className="profile-department">{currentUser.department} - {currentUser.year}</p>
            <p className="profile-bio">{currentUser.bio}</p>
            <button onClick={() => setIsEditing(true)} className="edit-profile-btn">
              Edit Profile
            </button>
          </div>
        )}
      </div>

      <div className="user-posts-section">
        <h3>Your Posts ({userPosts.length})</h3>
        <div className="user-posts-list">
          {userPosts.length === 0 ? (
            <p>You haven't created any posts yet</p>
          ) : (
            userPosts.map(post => (
              <div key={post.id} className="user-post-item">
                <h4>{post.title}</h4>
                <div className="post-meta">
                  <span>{post.votes} votes</span>
                  <span>{post.comments} comments</span>
                  <span>{post.viewCount} views</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
