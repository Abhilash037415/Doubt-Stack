import { useNavigate } from "react-router-dom";
import "./style.css";

function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("OTP sent! Redirecting...");
    navigate("/"); // or "/login" or wherever your home route is
  };

  return (
    <div className="register-page">
      <div className="container">
        <div className="left">
          <h2>Create Your DoubtStack Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required />
            </div>
            <div className="form-group">
              <label htmlFor="repassword">Confirm Password</label>
              <input type="password" id="repassword" required />
            </div>
            <button type="submit">Send OTP</button>
            <div className="form-footer">
              Already have an account? <a href="/">Sign in</a>
            </div>
          </form>
        </div>
        <div className="right">
          <h1>Join the DoubtStack Community</h1>
          <p>
            Get instant help with your studies — ask questions, share knowledge,
            and collaborate with classmates and faculty in a secure,
            college-only platform.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
