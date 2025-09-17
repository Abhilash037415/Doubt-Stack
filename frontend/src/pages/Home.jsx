import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Post from "../components/Post";
import CreatePostModal from "../components/CreatePostModal";
import Profile from "../components/Profile";
import "./style.css";

function Home() {
  const [activeSection, setActiveSection] = useState("home");
  const [showModal, setShowModal] = useState(false);

  const posts = [
    {
      id: 1,
      username: "@alex_cs",
      department: "Computer Science",
      time: "2 hours ago",
      type: "Question",
      title: "Help with Data Structures Assignment",
      content:
        "I'm struggling with implementing a binary search tree in C++. Can someone explain the insertion process step by step?",
      tags: ["#DataStructures", "#CPlusPlus", "#Assignment"],
      upvotes: 12,
      downvotes: 1,
      comments: 8,
    },
    {
      id: 2,
      username: "@priya_ece",
      department: "Electronics & Communication",
      time: "5 hours ago",
      type: "Answered",
      title: "Digital Signal Processing Lab Questions",
      content:
        "Can anyone share the solution for DSP Lab Exercise 3? Which software is better - MATLAB or Python?",
      tags: ["#DSP", "#MATLAB", "#Python", "#Lab"],
      upvotes: 25,
      downvotes: 0,
      comments: 15,
    },
    {
      id: 3,
      username: "@rahul_mech",
      department: "Mechanical Engineering",
      time: "1 day ago",
      type: "Discussion",
      title: "Best CAD Software for Mechanical Design",
      content:
        "What's your experience with CAD software? Is Fusion 360 worth learning?",
      tags: ["#CAD", "#SolidWorks", "#AutoCAD", "#Career"],
      upvotes: 18,
      downvotes: 2,
      comments: 22,
    },
  ];

  return (
    <div className="home-page">
      <Sidebar setActiveSection={setActiveSection} />
      <div className="main-content">
        <Topbar setShowModal={setShowModal} />

        <div className="content-area">
          {activeSection === "home" && (
            <div id="home-section" className="section active">
              <div className="welcome-banner">
                <h1>Welcome to DoubtStack! 👋</h1>
                <p>Ask questions, share knowledge, and connect with classmates</p>
                <button
                  className="cta-button"
                  onClick={() => setShowModal(true)}
                >
                  Ask Your Question
                </button>
              </div>

              <div className="posts">
                {posts.map((post) => (
                  <Post key={post.id} {...post} />
                ))}
              </div>
            </div>
          )}

          {activeSection === "recent" && (
            <div id="recent-section" className="section">
              <h2>Recent Activity</h2>
              <p>Your recent posts and interactions will appear here.</p>
            </div>
          )}

          {activeSection === "profile" && <Profile />}
        </div>
      </div>

      {showModal && <CreatePostModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Home;
