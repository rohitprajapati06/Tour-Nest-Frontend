import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import MenuBar from '../LandingPage/NavBar/MenuBar';

const Home = () => {
  return (
    <div className="home-container">
      <MenuBar />
      <video autoPlay loop muted className="background-video">
        <source src="/Video/Landing_Screen.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="content">
      <h1
  style={{
    color: '#FFD700', // Bright yellow-gold for better contrast
    fontSize: '50px',
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: '2px', // Adds spacing for readability
    textShadow: '4px 4px 10px rgba(0, 0, 0, 0.8), 2px 2px 5px rgba(255, 255, 0, 0.6)', // Dual-layer shadow for depth
  }}
>
  Plan Your Next Trip With AI
</h1>

        <Link to="/Chatbot">
          <button className="cta-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
