import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateBlog.css";
import { FaCameraRetro, FaImage, FaPencilAlt, FaTimes } from "react-icons/fa";
import LocationSearch from "./Location"; // Import the LocationSearch component

const CreateBlog = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [location, setLocation] = useState("");
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // NEW: Track submission state
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
  );

  useEffect(() => {
    const fetchProfilePhoto = async () => {
      try {
        const response = await axios.get("https://localhost:7030/api/User", {
          headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
        });
        setProfilePhotoUrl(`${response.data.profilePhoto}?t=${Date.now()}`); // Cache-busting
      } catch (error) {
        console.error("Error fetching profile photo:", error);
      }
    };

    fetchProfilePhoto();
  }, []);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const getUserIdFromToken = () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return null;
    try {
      return JSON.parse(atob(token.split(".")[1])).sub;
    } catch (err) {
      console.error("Invalid token", err);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      setMessage("Please upload an image");
      return;
    }

    const userId = getUserIdFromToken();
    if (!userId) {
      setMessage("User ID not found. Please log in again.");
      return;
    }

    setIsSubmitting(true); // Disable button & show "Posting..."

    const formData = new FormData();
    formData.append("Location", location);
    formData.append("Caption", caption);
    formData.append("Image", image);

    try {
      const response = await axios.post("https://localhost:7030/api/Blog/CreateBlog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      setMessage(response.data.message);
      setIsFormVisible(false);
      setCaption("");
      setLocation("");
      setImage(null);
    } catch (error) {
      setMessage(error.response?.data?.message || "An error occurred");
    } finally {
      setIsSubmitting(false); // Enable button after request completes
    }
  };

  return (
    <div className={`blog-create-blog-container ${isFormVisible ? "blog-form-open" : ""}`}>
      {!isFormVisible && (
        <div className="blog-post-box" onClick={() => setIsFormVisible(true)}>
          <div className="blog-post-placeholder">
            <img src={profilePhotoUrl} alt="Profile" className="blog-profile-pic" />
            <input
              onClick={() => setIsFormVisible(true)}
              type="text"
              placeholder="Share your travel experience with everyone"
              onFocus={() => setIsFormVisible(true)}
              disabled
            />
          </div>
          <div className="blog-post-options">
            <button className="blog-camera-btn">
              <FaCameraRetro />
            </button>
            <button className="blog-image-btn">
              <FaImage />
            </button>
            <button className="blog-edit-btn">
              <FaPencilAlt />
            </button>
          </div>
        </div>
      )}

      {isFormVisible && (
        <form onSubmit={handleSubmit} className="blog-blog-form">
          <div className="blog-form-header">
            <img src={profilePhotoUrl} alt="Profile" className="blog-form-profile-pic" />
            <FaTimes className="blog-close-icon" onClick={() => setIsFormVisible(false)} />
          </div>

          <div className="blog-form-group">
            <textarea
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What would you like to share?"
              className="blog-custom-textarea"
              required
            ></textarea>
          </div>

          <div className="blog-form-group blog-file-upload-group">
            <label htmlFor="image" className={image ? "blog-image-uploaded" : "blog-image-not-uploaded"}>
              <FaImage />
            </label>
            <input type="file" id="image" accept=".png, .jpg, .jpeg" onChange={handleImageChange} style={{ display: "none" }} />
            {image && <span className="blog-file-name">{image.name}</span>}
          </div>

          <div className="blog-form-group">
            <LocationSearch onLocationSelect={(selectedLocation) => setLocation(selectedLocation)} />
          </div>

          {/* ✅ Button with loading state */}
          <button className="blog-submit-post-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </form>
      )}

      {message && <p className="blog-message">{message}</p>}
    </div>
  );
};

export default CreateBlog;
