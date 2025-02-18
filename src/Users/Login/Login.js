import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api";  // Assuming you have a centralized api client for axios
import { useNavigate } from "react-router-dom";

import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle login logic
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/Auth/Login", { email, password });

      if (response.status === 200) {
        const { accessToken, refreshToken, userEmail } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userEmail", userEmail); // Save user's email

        setMessage("Login successful");
        navigate("/"); // Redirect to home page
      }
    } catch (err) {
      setMessage("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  // Refresh the access token every 9 minutes
  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) throw new Error("No refresh token found");

    try {
      const response = await axios.post("https://localhost:7030/api/Auth/Refresh", { refreshToken });
      if (response.status === 200) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", newRefreshToken);
        return accessToken;
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
      localStorage.clear();
      throw error;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      refreshAccessToken().catch(() => {
        setMessage("Session expired. Please login again.");
        localStorage.clear();
        navigate("/login");
      });
    }, 9 * 60 * 1000); // Refresh every 9 minutes
    return () => clearInterval(interval);
  }, [navigate]);

  return (
    <div className="split-screen">
      <div className="left">
        <img
          src="https://cdn.pixabay.com/photo/2020/07/10/04/06/pink-algae-5389441_1280.jpg"
          alt="Login Illustration"
        />
      </div>
      <div className="right">
        <form onSubmit={handleLogin} className="form">
          <p style={{ color: "rgb(249, 145, 235)", fontSize: 28, margin: 0 }}>
            "Join the Journey, <br />Discover new Horizons "
          </p>
          <h1>Login Now</h1>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {message && (
            <p style={{ color: message === "Login successful" ? "green" : "red" }}>
              {message}
            </p>
          )}
          <button type="submit" className="loginbtn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {/*<p>Or</p>
          <div className="social-login">
            <button className="social-btn fb">Login with Facebook</button>
            <button className="social-btn google">Login with Google</button>
          </div>*/}
          <p>
            Create an Account <a href="./register"> Register Here!</a>
          </p>
         {/*<p>
            Forgot Password? <a href="./Forget"> Reset Password</a>
          </p>*/}
        </form>
      </div>
    </div>
  );
}

export default Login;
