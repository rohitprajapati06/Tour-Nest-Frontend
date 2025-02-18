import React, { useState } from "react";
import axios from "axios";
import "./Register.css";
import OtpVerification from "../Otp/OtpVerification";

const Register = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [isOtpSent, setIsOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({}); // Reset errors

    // Frontend validation for password match
    if (user.password !== user.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match!" });
      return;
    }

    try {
      const response = await axios.post("https://localhost:7030/api/Auth/Register", user, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setMessage("OTP sent to your email. Please verify to complete registration.");
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error("Registration Error:", error);

      // Handle validation errors from the backend
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className="register-page-form-flight-container">
      <div className="register-page-form-flight-split register-page-form-flight-left">
        <img
          src="https://cdn.pixabay.com/photo/2016/11/29/01/26/antlers-1866537_960_720.jpg"
          alt="Scenic"
          className="register-page-form-flight-full-img"
        />
      </div>

      <div className="register-page-form-flight-split register-page-form-flight-right">
        {isOtpSent ? (
          <OtpVerification email={user.email} />
        ) : (
          <div className="register-page-form-flight-form-container">
            <h2>"Explore the world with us"</h2>
            <h1>Register Now</h1>
            <hr />

            {message && <p className="register-page-form-flight-message">{message}</p>}

            <form onSubmit={handleSubmit}>
              <label htmlFor="firstName"><b>First Name</b></label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={user.firstName}
                onChange={handleChange}
                required
              />
              {errors.firstName && <p className="register-page-form-flight-error">{errors.firstName}</p>}

              <label htmlFor="lastName"><b>Last Name</b></label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={user.lastName}
                onChange={handleChange}
                required
              />
              {errors.lastName && <p className="register-page-form-flight-error">{errors.lastName}</p>}

              <label htmlFor="email"><b>Email</b></label>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={user.email}
                onChange={handleChange}
                required
              />
              {errors.email && <p className="register-page-form-flight-error">{errors.email}</p>}

              <label htmlFor="password"><b>Password</b></label>
              <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={handleChange}
                required
              />
              {errors.password && <p className="register-page-form-flight-error">{errors.password}</p>}

              <label htmlFor="confirmPassword"><b>Confirm Password</b></label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={user.confirmPassword}
                onChange={handleChange}
                required
              />
              {errors.confirmPassword && <p className="register-page-form-flight-error">{errors.confirmPassword}</p>}

              <p>By signing up, you accept the <a href="./Terms">Terms & Policy</a></p>
              <button type="submit" className="register-page-form-flight-registerbtn">Register</button>

              <p>Already have an account? <a href="./login">Login Here</a></p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
