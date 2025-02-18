import React, { useState, useEffect } from "react";
import axios from "axios";
import './UpdateEmail.css'; // Import the CSS file

const UpdateEmail = () => {
  const [user, setUser] = useState({ email: "", profilePhoto: "", username: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [otpMessage, setOtpMessage] = useState("");
  const [step, setStep] = useState(1); // Step 1: Email input, Step 2: OTP input
  const [otp, setOtp] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get("https://localhost:7030/api/User", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching user data");
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleSendOtp = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://localhost:7030/api/User/send-otp",
        { email: newEmail },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOtpMessage(response.data.Message || "OTP sent successfully.");
      setStep(2); // Move to OTP input step
    } catch (err) {
      setOtpMessage(err.response?.data?.message || "Failed to send OTP.");
    }
  };

  const handleUpdateEmail = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `https://localhost:7030/api/User/update-email?otp=${otp}`,
        { email: newEmail },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOtpMessage(response.data.Message || "Email updated successfully.");
      setStep(1); // Reset to initial step
      setUser((prevUser) => ({ ...prevUser, email: newEmail }));
      setNewEmail("");
      setOtp("");
    } catch (err) {
      setOtpMessage(err.response?.data?.message || "Failed to update email.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="user-email-updating-profile-error">{error}</p>;

  return (
    <div className="user-email-updating-profile-container">
      {step === 1 && (
        <>
          <div className="user-email-updating-profile-input-container">
            <label htmlFor="email" className="user-email-updating-profile-label">Current Email:</label>
            <input
              type="text"
              id="email"
              value={user.email}
              readOnly
              className="user-email-updating-profile-input"
            />
          </div>
          <div className="user-email-updating-profile-input-container">
            <label htmlFor="newEmail" className="user-email-updating-profile-label">New Email:</label>
            <input
              type="text"
              id="newEmail"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="user-email-updating-profile-input"
            />
          </div>
          <button
            onClick={handleSendOtp}
            className="user-email-updating-profile-button user-email-updating-profile-send-otp"
          >
            Send OTP
          </button>
        </>
      )}

      {otpMessage && <p className={`user-email-updating-profile-message ${otpMessage.includes("success") ? "success" : "error"}`}>{otpMessage}</p>}

      {step === 2 && (
        <div className="user-email-updating-profile-otp-container">
          <h4>Enter OTP</h4>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="user-email-updating-profile-input"
          />
          <button
            onClick={handleUpdateEmail}
            className="user-email-updating-profile-button user-email-updating-profile-update-email"
          >
            Update Email
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdateEmail;
