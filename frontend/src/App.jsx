import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Landing from "./pages/Landing"; // 👈 new landing page (uses Sidebar, Topbar, etc.)

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Pages */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Main Landing Page */}
        <Route path="/home" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
