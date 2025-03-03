import React, { useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axiosInstance";

const Forgot = () => {
  console.log("🔍 Forgot Password Page Loaded!");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await API.post("/auth/forgot-password", { email });
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h2><strong>Reset Your Password Here</strong> ☛</h2>
      <div className="auth-box fade-in-tab">
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">Send Reset Link</button>
        </form>

        <p className="auth-text">
          Remembered your password? <Link className="forgot-password-link" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Forgot;
