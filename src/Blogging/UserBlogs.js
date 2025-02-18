import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaMapMarkerAlt } from "react-icons/fa"; // Import for location icon
import "./BlogList.css"; // Optional: Custom styles

const UserBlogs = ({ onBack }) => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");

      if (!token) {
        setError("User not authenticated");
        return;
      }

      try {
        const response = await axios.get("https://localhost:7030/api/Blog", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
      } catch (err) {
        if (err.response) {
          setError(err.response.data.message || "An error occurred");
        } else {
          setError("Unable to fetch data");
        }
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="blog-list-container">
      <button
        onClick={onBack}
        style={{
          fontSize: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#f0f0f0",
          color: "black",
          border: "1px solid #ccc",
          borderRadius: "4px",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        &#10094;&#10094;
      </button>

      <div className="blog-list">
        {userData.blogs.length > 0 ? (
          userData.blogs.map((blog) => (
            <div key={blog.blogId} className="blog-card">
              <div className="blog-header">
                <img
                  src={userData.profilePhoto}
                  alt={`${blog.username}'s profile`}
                  className="profile-photo"
                />
                <div className="user-info">
                  <h3>{userData.username}</h3>
                  <small>
                    Posted on:{" "}
                    {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "2-digit",
                    })}
                  </small>
                </div>
              </div>
              <div className="blog-details">
                <small className="user-location">
                  <b>
                    <FaMapMarkerAlt /> at
                  </b>{" "}
                  {blog.location || "N/A"}
                </small>
                <p className="blog-caption">{blog.caption}</p>
              </div>
              <img src={blog.image} alt="Blog" className="blog-image" />
            </div>
          ))
        ) : (
          <p>You haven't created any blogs yet.</p>
        )}
      </div>
    </div>
  );
};

export default UserBlogs;
