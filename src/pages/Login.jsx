import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!found) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(found));
    navigate("/dashboard");
  }

  return (
    <div className="auth-container">
      <nav className="auth-nav">
        <h1
          className="landing-logo"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          myINVOICE
        </h1>
        <button className="btn-outline" onClick={() => navigate("/")}>
          ← Back to Home
        </button>
      </nav>
      <div className="auth-box">
        <h1>myINVOICE</h1>
        <h2>Welcome back</h2>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-msg">{error}</p>}

          <button type="submit" className="btn-primary">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
