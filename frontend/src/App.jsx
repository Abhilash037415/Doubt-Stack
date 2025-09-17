// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🔹 Pages
import Profile from "./components/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import CustomizeFeed from "./pages/CustomizeFeed";
import StudyGroups from "./pages/StudyGroups";
import DepartmentPosts from "./pages/DepartmentPosts";
import RecentActivity from "./pages/RecentActivity";
import "./pages/style.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔑 Auth routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🚀 Public Landing page */}
        <Route path="/landing" element={<Landing />} />

        {/* 📌 Main app routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/customize-feed" element={<CustomizeFeed />} />
        <Route path="/study-groups" element={<StudyGroups />} />
        <Route path="/department-posts" element={<DepartmentPosts />} />
        <Route path="/recent-activity" element={<RecentActivity />} />
        <Route path="/profile" element={<Profile />} />

        {/* 404 fallback (optional) */}
        <Route path="*" element={<h2 style={{ textAlign: "center" }}>404 - Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
