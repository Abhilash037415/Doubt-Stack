import React, { useState } from "react";
import "../pages/style.css";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Post from "../components/Post";
import CreatePostModal from "../components/CreatePostModal";

export default function Landing() {
  const [activeSection, setActiveSection] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  const posts = [
    {
      username: "@alex_cs",
      department: "Computer Science",
      time: "2 hours ago",
      type: "Question",
      title: "Help with Data Structures Assignment",
      content: "I'm struggling with implementing a binary search tree in C++...",
      tags: ["DataStructures", "CPlusPlus", "Assignment"],
      votes: 12,
      comments: 8,
    },
    {
      username: "@priya_ece",
      department: "Electronics",
      time: "5 hours ago",
      type: "Answered",
      title: "Digital Signal Processing Lab Questions",
      content: "Can anyone share the solution for DSP Lab Exercise 3?",
      tags: ["DSP", "MATLAB", "Python", "Lab"],
      votes: 25,
      comments: 15,
    },
  ];

  return (
    <div className="home-page">
      <Sidebar setActiveSection={setActiveSection} />

      <div className="main-content">
        <Topbar onSearch={setSearchTerm} openModal={() => setShowModal(true)} />

        <div className="content-area">
          {activeSection === "home" && (
            <div id="home-section" className="section active">
              <div className="welcome-banner">
                <h1>Welcome to DoubtStack 👋</h1>
                <p>Ask questions, share knowledge, and connect with classmates</p>
                <button className="cta-button" onClick={() => setShowModal(true)}>
                  Ask Your First Question
                </button>
              </div>

              <div className="posts">
                {posts
                  .filter(
                    (p) =>
                      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      p.content.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((post, i) => (
                    <Post key={i} {...post} />
                  ))}
              </div>
            </div>
          )}

          {activeSection === "recent" && (
            <div className="section">
              <h2>Recent Activity</h2>
              <p>Your recent posts will appear here.</p>
            </div>
          )}

          {activeSection === "profile" && (
            <div className="section">
              <h2>Your Profile</h2>
              <p>Profile details go here.</p>
            </div>
          )}
        </div>
      </div>

      <CreatePostModal show={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
