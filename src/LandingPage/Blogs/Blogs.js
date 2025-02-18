import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Blogs.css';

const Blogs = () => {
  return (
    <div className="lp-container">
      <div className="main-heading">
        <h1>Welcome to Travel Stories</h1>
      </div>
      
      {/* Video 1 */}
      <div className="video-container video-left">
        <video autoPlay loop muted playsInline>
          <source
            src="https://cdn.pixabay.com/video/2022/05/07/116288-707404742_large.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="description">
          <p>
            <q>
              Where will your story take you? <br /> Share your travel tales with our community!
            </q>
          </p>
          <Link to="/Blogs" className="action-button">Discover New Travel Stories</Link>
        </div>
      </div>

      {/* Video 2 */}
      <div className="video-container video-right">
        <video autoPlay loop muted playsInline>
          <source
            src="https://videos.pexels.com/video-files/6328207/6328207-uhd_2732_1440_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="description">
          <p>
            <q>
              Unleash your creativity and share your travel adventures in a community that loves exploration!
            </q>
          </p>
          <Link to="/Blogs" className="action-button">Share Your Travel Story</Link>
        </div>
      </div>

      {/* Video 3 */}
      <div className="video-container video-left">
        <video autoPlay loop muted playsInline>
          <source
            src="https://videos.pexels.com/video-files/3002391/3002391-hd_1920_1080_25fps.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="description">
          <p>
            <q>Join our community of travel enthusiasts and share your unforgettable experiences!</q>
          </p>
          <Link to="/Blogs" className="action-button">Get Inspired by Fellow Travelers</Link>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
