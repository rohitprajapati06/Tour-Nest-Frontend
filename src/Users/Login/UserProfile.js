import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaSignOutAlt, FaUserAlt, FaUserEdit } from "react-icons/fa";
import './UserProfile.css'; // Import external CSS file

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        if (!token) {
          setLoading(false);
          return;
        }

        const response = await fetch("https://localhost:7030/api/User", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Failed to fetch user details.");
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login"); // Redirect to login page
  };

  const handleSignIn = () => {
    navigate("/login"); // Redirect to login page
  };

  const handleSignUp = () => {
    navigate("/register"); // Redirect to register page
  };

  const toggleDetails = () => setShowDetails((prev) => !prev); // Toggle visibility of details

 

  const defaultProfilePhoto =
    "https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"; // Default image URL

  // Display Sign In/Sign Up buttons if no access token or an error occurs
  if (!localStorage.getItem("accessToken") || error || !user || loading) {
    return (
      <div className="jwtUser-nav-actions">
        <button className="jwtUser-signup-btn" onClick={handleSignUp}>
          Sign Up
        </button>
        <button className="jwtUser-login-btn" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="jwtUser-user-details">
      <button
        className="jwtUser-user-details-button"
        onClick={toggleDetails}
      >
        <FaUserAlt />
        {user.email || "User Email"} <FaChevronDown />
      </button>

      {showDetails && (
        <div className="jwtUser-user-details-container">
          <div className="jwtUser-user-info">
            <img
              src={user.profilePhoto || defaultProfilePhoto}
              alt="Profile"
              className="jwtUser-profile-photo"
            />
            <div>
              <h3 className="jwtUser-user-username">{user.username || "User Name"}</h3>
              <p className="jwtUser-user-email">{user.email || "User Email"}</p>
            </div>
          </div>
          <div className="jwtUser-user-actions">
            <div
              className="jwtUser-action-item"
              onClick={() => navigate("/UserProfile")} // Redirect to ProfileManagement
            >
              <span>
                <FaUserEdit /> Edit Profile
              </span>
            </div>
            <div
              className="jwtUser-action-item"
              onClick={handleLogout}
            >
              <span>
                <FaSignOutAlt /> Log out
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
