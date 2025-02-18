import React, { useState } from "react";
import axios from "axios";
import './UpdatePassword.css'; // Import the CSS file

const UpdatePassword = () => {
  const [otpMessage, setOtpMessage] = useState("");
  const [step, setStep] = useState(1); // Step 1: Password input, Step 2: OTP input
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // For showing loading message

  const handleSendOtp = async () => {
    if (newPassword !== confirmPassword) {
      setOtpMessage("Passwords do not match.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setOtpMessage("Please fill in both password fields.");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await axios.post(
        "https://localhost:7030/api/User/send-otp",
        { password: newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOtpMessage(response.data.Message || "OTP sent successfully.");
      setStep(2);
    } catch (err) {
      setOtpMessage(err.response?.data?.message || "Failed to send OTP.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!otp) {
      setOtpMessage("Please enter the OTP.");
      return;
    }

    try {
      setIsLoading(true);
      const token = localStorage.getItem("accessToken");
      const response = await axios.patch(
        `https://localhost:7030/api/User/update-password?otp=${otp}`,
        { Password: newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setOtpMessage(response.data.Message || "Password updated successfully.");
      setStep(1);
      setNewPassword("");
      setConfirmPassword("");
      setOtp("");
    } catch (err) {
      setOtpMessage(err.response?.data?.message || "Failed to update password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="user-password-updating-profile-container">
      {step === 1 && (
        <>
          <div className="user-password-updating-profile-input-container">
            <label htmlFor="newPassword" className="user-password-updating-profile-label">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="user-password-updating-profile-input"
              required
            />
          </div>
          <div className="user-password-updating-profile-input-container">
            <label htmlFor="confirmPassword" className="user-password-updating-profile-label">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="user-password-updating-profile-input"
              required
            />
          </div>
          <button
            onClick={handleSendOtp}
            className="user-password-updating-profile-button user-password-updating-profile-send-otp"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </>
      )}

      {otpMessage && <p className={`user-password-updating-profile-message ${otpMessage.includes("success") ? "success" : "error"}`}>{otpMessage}</p>}

      {step === 2 && (
        <div className="user-password-updating-profile-otp-container">
          <h4>Enter OTP</h4>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="user-password-updating-profile-input"
          />
          <button
            onClick={handleUpdatePassword}
            className="user-password-updating-profile-button user-password-updating-profile-update-password"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Update Password"}
          </button>
        </div>
      )}
    </div>
  );
};

export default UpdatePassword;
