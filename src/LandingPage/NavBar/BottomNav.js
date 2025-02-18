import React from "react";
import { FaHome, FaMapSigns, FaPlaneDeparture, FaPhoneAlt, FaClipboardList, FaUser } from "react-icons/fa";
import "./BottomNavbar.css";

const BottomNavbar = () => {
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
          <a href="/signin" className="signin-button">
            <FaUser/>
          </a>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bottom-navbar">
        <div className="nav-icon">
          <FaHome />
          <span>Home</span>
        </div>
        <div className="nav-icon">
          <FaMapSigns />
          <span>Tours</span>
        </div>
        <div className="nav-icon">
          <FaPlaneDeparture />
          <span>Flights</span>
        </div>
        <div className="nav-icon">
          <FaPhoneAlt />
          <span>Support</span>
        </div>
        <div className="nav-icon">
          <FaClipboardList />
          <span>Insurance</span>
        </div>
      </div>
    </div>
  );
};

export default BottomNavbar;
