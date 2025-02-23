import React from "react";
import { FaHome, FaMapSigns, FaPlaneDeparture, FaPhoneAlt, FaClipboardList, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";  // Updated import
import "./BottomNavbar.css";

const BottomNavbar = () => {
  const navigate = useNavigate(); // Using useNavigate instead of useHistory
  
  // Check if user is logged in by verifying if JWT token exists
  const isLoggedIn = localStorage.getItem("accessToken") ? true : false;

  // Handle click on user icon (Profile or Login)
  const handleUserClick = () => {
    if (isLoggedIn) {
      navigate("/userprofile"); // Redirect to UserProfile if logged in
    } else {
      navigate("/login"); // Redirect to Login page if not logged in
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="header">
        <div className="logo-section">
          <img src="mylogo.jpg" alt="Logo" className="logo-image" />
          <span className="logo-text">
            Tour<span className="logo-highlight">Nest</span>
          </span>
        </div>
        <div className="signin-section">
          <button className="signin-button" onClick={handleUserClick}>
            <FaUser />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navbar">
        <div className="nav-icon">
          <a href="/home"><FaHome /></a>
          <span>Home</span>
        </div>
        <div className="nav-icon">
          <a href="/tours"><FaMapSigns /></a>
          <span>Tours</span>
        </div>
        <div className="nav-icon">
          <a href="/flights"><FaPlaneDeparture /></a>
          <span>Flights</span>
        </div>
        <div className="nav-icon">
          <a href="/EmergencyContact"><FaPhoneAlt /></a>
          <span>Support</span>
        </div>
        <div className="nav-icon">
          <a href="/Chatbot"><FaClipboardList /></a>
          <span>Chat</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
