import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './OtpVerification.css';

const OtpVerification = ({ email }) => {
  const [otp, setOtp] = useState(new Array(6).fill('')); // Array for 6-digit OTP
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // Handle OTP input change
  const handleChange = (e, index) => {
    const value = e.target.value;

    // Allow only numeric input
    if (/^[0-9]$/.test(value) || value === '') {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Automatically focus the next input box
      if (value && index < 5) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  // Handle OTP form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await axios.post(
        'https://localhost:7030/api/Auth/VerifyOtp',
        { email, otp: otp.join('') },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setMessage('Registration completed successfully');
        setTimeout(() => {
          navigate('/Login'); // Redirect to the home page after 2 seconds
        }, 2000);
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Verification failed. Please try again.');
      }
    }
  };

  // Handle Resend OTP
  const handleResend = async () => {
    try {
      const response = await axios.post(
        'http://localhost:7030/api/Auth/Register', // Endpoint to resend OTP
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setMessage(response.data.message || 'OTP resent successfully!');
      setError(null);
    } catch (error) {
      console.error('Error resending OTP:', error);
      setError('Error resending OTP. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className="otp-verification">
      <div className="otp-header">
        <img
          src="https://img.freepik.com/free-vector/two-factor-authentication-concept-illustration_114360-5280.jpg?semt=ais_hybrid"
          alt="Email Sent"
          className="icon"
        />
        <h2>Please check your email</h2>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWsMgRch2kZYG4uQQYn3sfIJvMaiWFbaO5XUFlFw7VadG-MMZzWnAEjd7NUG9Hok1eSx8&usqp=CAU"
          alt="gmail"
          className="gicon"
        />
        <p>
          We've sent a code to <strong>{email}</strong>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              id={`otp-${index}`}
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="otp-box"
            />
          ))}
        </div>
        <p className="resend-text">
          Didn't get the code?{' '}
          <span className="resend-link" onClick={handleResend}>
            Click to resend.
          </span>
        </p>
        <div className="otp-actions">
          <button
            type="button"
            className="cancel-btn"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button type="submit" className="verify-btn">
            Verify
          </button>
        </div>
        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default OtpVerification;
