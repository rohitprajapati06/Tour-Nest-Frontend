import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import UserProfile from '../../Users/Login/UserProfile';

import {
  FaClipboardList,
  FaHome,
  FaMapMarked,
  FaPhoneAlt,
  FaPlaneDeparture,
  FaUmbrellaBeach,
} from "react-icons/fa";

const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home"); // Set "home" as default active link

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <nav className="navbar">
      <div className="logo-section">
        <img src="mylogo.jpg" alt="Logo" className="logo-image" />
        <span className="logo-text">
          Tour<span className="logo-highlight">Nest</span>
        </span>
      </div>

      <ul className="nav-links">
        <li className={`nav-home ${activeLink === "home" ? "active" : ""}`}>
          <Link to="/" onClick={() => handleLinkClick("home")}>
            <FaHome className="nav-icon" /> Home
          </Link>
        </li>
        <li className={`nav-tours ${activeLink === "tours" ? "active" : ""}`}>
          <Link to="./Tours" onClick={() => handleLinkClick("tours")}>
            <FaUmbrellaBeach className="nav-icon" /> Tours
          </Link>
        </li>
        <li className={`nav-flights ${activeLink === "flights" ? "active" : ""}`}>
          <Link to="./Flights" onClick={() => handleLinkClick("flights")}>
            <FaPlaneDeparture className="nav-icon" /> Flights
          </Link>
        </li>
        <li className={`nav-blogs ${activeLink === "blogs" ? "active" : ""}`}>
          <Link to="/Maps" onClick={() => handleLinkClick("blogs")}>
            <FaMapMarked className="nav-icon" /> Maps
          </Link>
        </li>
        <li className={`nav-emergency ${activeLink === "emergency" ? "active" : ""}`}>
          <Link to="./EmergencyContact" onClick={() => handleLinkClick("emergency")}>
            <FaPhoneAlt className="nav-icon" /> Emergency Contact
          </Link>
        </li>
        <li className={`nav-insurance ${activeLink === "insurance" ? "active" : ""}`}>
          <Link to="/Chatbot" onClick={() => handleLinkClick("insurance")}>
            <FaClipboardList className="nav-icon" /> Chatbot
          </Link>
        </li>
      </ul>

      <div className="nav-actions">
        <UserProfile />
      </div>
    </nav>
  );
};

export default NavBar;
