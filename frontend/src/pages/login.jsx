// src/pages/Login.jsx
import { useNavigate } from "react-router-dom";
import "./login.css"; // move your CSS into a separate file

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // after successful login logic, navigate to home/dashboard
    navigate("/home"); // or later you can make navigate("/home")
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
              <a onClick={() => navigate("/signup")} style={{ cursor: "pointer" }}>
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

export default Login