import { useState } from "react";

function Post({ username, department, time, type, title, content, tags, upvotes, downvotes, comments }) {
  const [voteCount, setVoteCount] = useState(upvotes);
  const [downVoteCount, setDownVoteCount] = useState(downvotes);
  const [saved, setSaved] = useState(false);

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
          <span key={i} className="tag">{tag}</span>
        ))}
      </div>

      <div className="post-actions">
        <span className="action upvote" onClick={() => setVoteCount(voteCount + 1)}>
          ⬆️ {voteCount}
        </span>
        <span className="action downvote" onClick={() => setDownVoteCount(downVoteCount + 1)}>
          ⬇️ {downVoteCount}
        </span>
        <span className="action comment">💬 {comments}</span>
        <span className="action save" onClick={() => setSaved(!saved)}>
          {saved ? "⭐ Saved" : "⭐ Save"}
        </span>
        <span className="action share">📤 Share</span>
      </div>
    </div>
  );
}

export default Post;
