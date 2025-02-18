import React from "react";
import { Link } from "react-router-dom"; 
import "./Footer.css"; // Ensure you have the CSS file for styling

const FlightFooter = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Support Section */}
        <div className="footer-column">
          <h4>Support</h4>
          <ul>
            <li><Link to="#">Manage your trips</Link></li>
            <li><Link to="#">Emergency Contacts</Link></li>
            <li><Link to="#">Safety resource centre</Link></li>
          </ul>
        </div>

        {/* Discover Section */}
        <div className="footer-column">
          <h4>Discover</h4>
          <ul>
            <li><Link to="#">Genius loyalty programme</Link></li>
            <li><Link to="#">Seasonal and holiday deals</Link></li>
            <li><Link to="#">Travel articles</Link></li>
            <li><Link to="#">TourNest for Business</Link></li>
            <li><Link to="#">Travellers Review</Link></li>
            <li><Link to="#">Car hire</Link></li>
            <li><Link to="#">Flight finder</Link></li>
            <li><Link to="#">Restaurant reservations</Link></li>
            <li><Link to="#">TourNest for Travel Agents</Link></li>
          </ul>
        </div>

        {/* Terms and Settings Section */}
        <div className="footer-column">
          <h4>Terms and Settings</h4>
          <ul>
            <li><Link to="#">Privacy & cookies</Link></li>
            <li><Link to="#">Terms and conditions</Link></li>
            <li><Link to="#">Modern Slavery Statement</Link></li>
            <li><Link to="#">Human Rights Statement</Link></li>
          </ul>
        </div>

        {/* Partners Section */}
        <div className="footer-column">
          <h4>Partners</h4>
          <ul>
            <li><Link to="#">Extranet login</Link></li>
            <li><Link to="#">Partner help</Link></li>
            <li><Link to="#">List your property</Link></li>
            <li><Link to="#">Become an affiliate</Link></li>
          </ul>
        </div>

        {/* About Section */}
        <div className="footer-column">
          <h4>About</h4>
          <ul>
            <li><Link to="#">About TourNest</Link></li>
            <li><Link to="#">How we work</Link></li>
            <li><Link to="#">Sustainability</Link></li>
            <li><Link to="#">Press centre</Link></li>
            <li><Link to="#">Careers</Link></li>
            <li><Link to="#">Investor relations</Link></li>
            <li><Link to="#">Corporate contact</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default FlightFooter;
