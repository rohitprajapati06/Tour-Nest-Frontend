import React, { useState, useEffect } from "react";
import "./ProfileManagement.css";
import { FaCamera, FaEnvelope, FaKey, FaUserEdit, FaBookmark, FaArrowLeft, FaSignOutAlt } from "react-icons/fa";
import BlogProfile from "../../Blogging/BlogProfile";
import UpdateUsername from "./UpdateUsername";
import UpdateEmail from "./UpdateEmail";
import UpdatePassword from "./UpdatePassword";
import BookingList from "../../Flights/Flight Booking/BookingList";
import { useNavigate } from "react-router-dom";

function ProfileManagement() {
  const [activeTab, setActiveTab] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const openTab = (tabName) => {
    if (tabName === "Logout") {
      handleLogout(); // Log out the user immediately when the "Logout" tab is clicked
    } else {
      setActiveTab(tabName); // Open other tabs
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="prolific-profile-management-container">
      {isMobile && !activeTab ? (
        // Show tab buttons for mobile view
        <div className="prolific-profile-management-user-tab mobile">
          <button onClick={() => openTab("EditUsername")}>
            <FaUserEdit /> Edit Username
          </button>
          <button onClick={() => openTab("AddProfilePhoto")}>
            <FaCamera /> Add Profile Photo
          </button>
          <button onClick={() => openTab("UpdateEmail")}>
            <FaEnvelope /> Update Email
          </button>
          <button onClick={() => openTab("UpdatePassword")}>
            <FaKey /> Update Password
          </button>
          <button onClick={() => openTab("MyBooking")}>
            <FaBookmark /> My Bookings
          </button>
          <button onClick={() => openTab("Logout")}>
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      ) : (
        <div className={`prolific-profile-management-user ${isMobile ? "mobile-view" : ""}`}>
          {!isMobile && (
            <div className="prolific-profile-management-user-tab">
              <button
                className={activeTab === "EditUsername" ? "active" : ""}
                onClick={() => openTab("EditUsername")}
              >
                <FaUserEdit /> Edit Username
              </button>
              <button
                className={activeTab === "AddProfilePhoto" ? "active" : ""}
                onClick={() => openTab("AddProfilePhoto")}
              >
                <FaCamera /> Add Profile Photo
              </button>
              <button
                className={activeTab === "UpdateEmail" ? "active" : ""}
                onClick={() => openTab("UpdateEmail")}
              >
                <FaEnvelope /> Update Email
              </button>
              <button
                className={activeTab === "UpdatePassword" ? "active" : ""}
                onClick={() => openTab("UpdatePassword")}
              >
                <FaKey /> Update Password
              </button>
              <button
                className={activeTab === "MyBooking" ? "active" : ""}
                onClick={() => openTab("MyBooking")}
              >
                <FaBookmark /> My Bookings
              </button>
              <button
                className={activeTab === "Logout" ? "active" : ""}
                onClick={() => openTab("Logout")}
              >
                <FaSignOutAlt /> Log Out
              </button>
            </div>
          )}

          {/* Show selected tab content */}
          {activeTab && isMobile && (
            <button style={{ backgroundColor: "#ccc" }} className="prolific-profile-management-back-button" onClick={() => setActiveTab(null)}>
              <FaArrowLeft />
            </button>
          )}

          <div className="prolific-profile-management-user-tabcontent" style={{ display: activeTab === "EditUsername" ? "block" : "none" }}>
            <h3>Edit Username <FaUserEdit /></h3>
            <p>Update your name for a fresh online presence.</p>
            <UpdateUsername />
          </div>

          <div className="prolific-profile-management-user-tabcontent" style={{ display: activeTab === "AddProfilePhoto" ? "block" : "none" }}>
            <h3>Add Profile Photo <FaCamera /></h3>
            <p>Upload a new profile picture to personalize your account.</p>
            <BlogProfile />
          </div>

          <div className="prolific-profile-management-user-tabcontent" style={{ display: activeTab === "UpdateEmail" ? "block" : "none" }}>
            <h3>Update Email <FaEnvelope /></h3>
            <p>Keep your email updated for important notifications.</p>
            <UpdateEmail />
          </div>

          <div className="prolific-profile-management-user-tabcontent" style={{ display: activeTab === "UpdatePassword" ? "block" : "none" }}>
            <h3>Update Password <FaKey /></h3>
            <p>Enhance security by updating your password regularly.</p>
            <UpdatePassword />
          </div>

          <div className="prolific-profile-management-user-tabcontent" style={{ display: activeTab === "MyBooking" ? "block" : "none" }}>
            <h3>My Bookings <FaBookmark /></h3>
            <p>View and manage your flight bookings.</p>
            <BookingList />
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfileManagement;
