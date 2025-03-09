import React, { useState, useEffect } from "react";
import axios from "axios";
import api from "../api"; 
import { useNavigate } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material"; 
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const navigate = useNavigate();

  useEffect(() => {
    setOpenSnackbar(true); 
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/Auth/Login", { email, password });

      if (response.status === 200) {
        const { accessToken, refreshToken, userEmail } = response.data;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("userEmail", userEmail);

        setMessage("Login successful");
        navigate("/"); 
      }
    } catch (err) {
      setMessage("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

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
    }, 9 * 60 * 1000); 
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
          <p>
            Create an Account <a href="./register"> Register Here!</a>
          </p>
        </form>
      </div>

      {/* Custom Snackbar without icon */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000} 
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="success"
          //variant="none" // No icon
          sx={{ 
            backgroundColor: "black", 
            color: "white", 
            fontWeight: "bold",
            boxShadow: "none",
          }}
        >
          Log in to start planning your dream trip with TourNest! ✈
        </Alert>
      </Snackbar>
    </div>
  );
}

export default Login;
