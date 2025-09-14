// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const usernameOrEmail = document.getElementById("username_or_email").value;
    const password = document.getElementById("password").value;

    // --- FRONTEND VALIDATION ---
    if (!usernameOrEmail || !password) {
      alert("All fields are required!");
      return;
    }

    // If it's an email, do a simple format check
    if (usernameOrEmail.includes("@")) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(usernameOrEmail)) {
        alert("Please enter a valid email address!");
        return;
      }
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    try {
      // --- BACKEND REQUEST ---
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usernameOrEmail, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Login successful!");
        navigate("/home");
      } else {
        alert(`❌ Login failed: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Something went wrong, please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="container">
        <div className="left">
          <h2>Login to DoubtStack</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username_or_email">Username or Email</label>
              <input
                type="text"
                id="username_or_email"
                name="username_or_email"
                placeholder="Enter your username or email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
              />
            </div>

            <button type="submit">Login</button>

            <div className="form-footer">
              Don’t have an account?{" "}
              <a
                onClick={() => navigate("/signup")}
                style={{ cursor: "pointer" }}
              >
                Click here
              </a>
            </div>
            <div className="form-footer">
              Forgot password? <a href="#">Click here</a>
            </div>
          </form>
        </div>

        <div className="right">
          <h1>Welcome Back!</h1>
          <p>Connect with your classmates or faculty instantly</p>
          <p>Post your doubts and get quick, reliable answers</p>
          <p>Stay updated on discussions that matter to your studies</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
