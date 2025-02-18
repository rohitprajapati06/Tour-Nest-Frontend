import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BlogList.css"; // Optional: Custom styles
import { FaMapMarkerAlt } from "react-icons/fa";

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("https://localhost:7030/api/Blog/AllBlogs");
        console.log("Fetched Blogs:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setBlogs(response.data);
        } else {
          setError("No blogs available.");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err.response || err.message || err);
        setError("Failed to load blogs. Please try again later.");
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-list-container">
      {error && <p className="error-message">{error}</p>}
      <div className="blog-list">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.blogId} className="blog-card">
              <div className="blog-header">
                <img
                  src={blog.profilePhoto}
                  alt={`${blog.username}'s profile`}
                  className="profile-photo"
                />
                <div className="user-info">
                  <h3>{blog.username}</h3>
                  <small> Posted on:{" "} {new Date(blog.createdAt).toLocaleDateString("en-GB", { day: "numeric",month: "short", year: "2-digit",})}</small>                 
                </div>
              </div>
              <div className="blog-details">
              <small className="user-location"><b> <FaMapMarkerAlt/> at</b> {blog.location} </small>
                <p className="blog-caption">{blog.caption}</p>
              </div>
              <img
                src={blog.imageUrl}
                alt="Blog"
                className="blog-image"
              />
            </div>
          ))
        ) : (
          <p>No blogs available at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default BlogList;
