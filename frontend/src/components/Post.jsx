import React, { useState } from "react";

export default function Post({ username, department, time, type, title, content, tags, votes, comments }) {
  const [voteCount, setVoteCount] = useState(votes);
  const [saved, setSaved] = useState(false);

  const vote = (direction) => {
    setVoteCount(direction === "up" ? voteCount + 1 : voteCount - 1);
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
      <div className="post-actions">
        <span className="action upvote" onClick={() => vote("up")}>⬆️ {voteCount}</span>
        <span className="action comment" onClick={() => alert("Comments section would open here")}>💬 {comments}</span>
        <span className="action save" onClick={() => setSaved(true)}>{saved ? "⭐ Saved" : "⭐ Save"}</span>
        <span className="action share" onClick={() => {navigator.clipboard.writeText(window.location.href); alert("Link copied to clipboard!");}}>📤 Share</span>
      </div>
    </div>
  );
}
