import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import API from "../api/axiosInstance";


const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");


  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await API.post("/auth/register", { username, email, password });
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data?.error || err.message);
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box fade-in-tab">
        {error && <p className="error-message">{error}</p>}
        <h2 className="auth-title">Join <span className="brand-highlight-tab">ZenTasker</span></h2>
        <p className="auth-subtitle">And turn your ideas into action!</p>
        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button className="auth-btn" type="submit">Register</button>
        </form>
        <p className="auth-text">
          Already have an account? <Link className="auth-link" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
