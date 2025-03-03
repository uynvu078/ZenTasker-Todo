import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";
import useAuthStore from "../store/authStore";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await API.post("/auth/login", { email, password });
      const { token } = response.data;

      console.log("Token received:", token);

      // Fetch user details using token
      const userResponse = await API.get("/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("User received:", userResponse.data);

      login(userResponse.data, token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      console.error("Login failed:", err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box fade-in-tab">
        <h2 className="auth-title">Welcome Back to <span className="brand-highlight-tab">ZenTasker</span></h2>
        <p className="auth-subtitle">Let's get you signed in!</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <input
              type="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p className="forgot-password">
            Forgot your password? <Link className="forgot-password-link" to="/forgot-password">Click here</Link>
          </p>
          <button type="submit" className="auth-btn">Login</button>
        </form>
        <p className="auth-text">
          Don't have an account? <Link className="auth-link" to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
