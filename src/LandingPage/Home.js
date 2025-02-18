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
        <h1 style={{ color: 'yellow', fontSize: '50px', fontWeight: 'bold', textShadow: 'black' }}>
          Plan your next trip with AI
        </h1>
        <Link to="/Chatbot">
          <button className="cta-button">Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
