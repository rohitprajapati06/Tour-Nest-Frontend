import React from "react";
import { FaHome, FaMapSigns, FaPlaneDeparture, FaPhoneAlt, FaUser, FaTumblrSquare } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import "./BottomNavbar.css";

const BottomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = localStorage.getItem("accessToken") ? true : false;

  const handleUserClick = () => {
    navigate(isLoggedIn ? "/userprofile" : "/login");
  };

  const handleNavigation = (path) => {
    if ((path === "/Chatbot" || path === "/EmergencyContact") && !isLoggedIn) {
      navigate("/login");
    } else {
      navigate(path);
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
          <button className="signin-button-of-the-mobile" onClick={handleUserClick}>
            <FaUser />
          </button>
        </div>
      </div>

      {/* Main Content Wrapper */}
      <div className="main-content">
        {/* Page content here */}
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navbar">
        <div className={`nav-icon ${location.pathname === "/" ? "active" : ""}`} onClick={() => handleNavigation("/")}>
          <FaHome />
          <span>Home</span>
        </div>
        <div className={`nav-icon ${location.pathname === "/tours" ? "active" : ""}`} onClick={() => handleNavigation("/tours")}>
          <FaMapSigns />
          <span>Tours</span>
        </div>
        <div className={`nav-icon ${location.pathname === "/flights" ? "active" : ""}`} onClick={() => handleNavigation("/flights")}>
          <FaPlaneDeparture />
          <span>Flights</span>
        </div>
        <div className={`nav-icon ${location.pathname === "/Chatbot" ? "active" : ""}`} onClick={() => handleNavigation("/Chatbot")}>
          <FaTumblrSquare />
          <span>Chat</span>
        </div>
        <div className={`nav-icon ${location.pathname === "/EmergencyContact" ? "active" : ""}`} onClick={() => handleNavigation("/EmergencyContact")}>
          <FaPhoneAlt />
          <span>Support</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
