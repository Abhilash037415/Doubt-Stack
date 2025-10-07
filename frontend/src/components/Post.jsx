import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import CommentSection from "./CommentSection";

export default function Post({ id, username, department, time, type, title, content, tags, votes, comments, viewCount }) {
  const { votePost, toggleSavePost, savedPosts } = useApp();
  const [voteCount, setVoteCount] = useState(votes);
  const [commentsList, setCommentsList] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const isSaved = savedPosts.includes(id);

  const handleVote = (direction) => {
    const newCount = direction === "up" ? voteCount + 1 : voteCount - 1;
    setVoteCount(newCount);
    votePost(id, direction);
  };

  const handleSave = () => {
    toggleSavePost(id);
  };

  const handleAddComment = (postId, commentText) => {
    const newComment = {
      id: Date.now(),
      userId: 1,
      username: "@current_user",
      content: commentText,
      time: "Just now",
      votes: 0
    };
    setCommentsList([...commentsList, newComment]);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="post">
      <div className="post-header">
        <div className="user-info">
          <span className="username">{username}</span>
          <span className="department">{department}</span>
          <span className="time">{time}</span>
        </div>
        <div className={`post-type ${type.toLowerCase()}`}>{type}</div>
      </div>
      <h2>{title}</h2>
      <p>{content}</p>
      <div className="post-tags">
        {tags.map((tag, i) => (
          <span className="tag" key={i}>#{tag}</span>
        ))}
      </div>
      <div className="post-footer">
        <div className="post-meta">
          <span className="view-count">👁️ {viewCount} views</span>
        </div>
        <div className="post-actions">
          <div className="vote-actions">
            <span className="action upvote" onClick={() => handleVote("up")}>⬆️</span>
            <span className="vote-count">{voteCount}</span>
            <span className="action downvote" onClick={() => handleVote("down")}>⬇️</span>
          </div>
          <span className="action comment" onClick={() => setShowComments(!showComments)}>
            💬 {commentsList.length || comments}
          </span>
          <span className={`action save ${isSaved ? 'saved' : ''}`} onClick={handleSave}>
            {isSaved ? "⭐ Saved" : "⭐ Save"}
          </span>
          <span className="action share" onClick={handleShare}>📤 Share</span>
        </div>
      </div>

      {showComments && (
        <CommentSection
          postId={id}
          comments={commentsList}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
}
