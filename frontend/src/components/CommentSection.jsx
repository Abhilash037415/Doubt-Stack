import React, { useState } from 'react';

export default function CommentSection({ postId, comments = [], onAddComment }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(postId, newComment);
      setNewComment('');
    }
  };

  return (
    <div className="comment-section">
      <button
        className="toggle-comments"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments ? 'Hide' : 'Show'} {comments.length} Comments
      </button>

      {showComments && (
        <div className="comments-container">
          <form onSubmit={handleSubmit} className="comment-form">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows="3"
            />
            <button type="submit">Post Comment</button>
          </form>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <div className="comment-header">
                  <span className="comment-username">{comment.username}</span>
                  <span className="comment-time">{comment.time}</span>
                </div>
                <p className="comment-content">{comment.content}</p>
                <div className="comment-actions">
                  <span className="comment-vote">👍 {comment.votes}</span>
                  <span className="comment-reply">Reply</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
