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

  const validateField = (name, value) => {
    let error = "";

    // Validation rules
    if (name === "firstName" || name === "lastName") {
      const namePattern = /^[A-Za-z][A-Za-z\s]*$/;
      if (!namePattern.test(value)) {
        error = `${name.charAt(0).toUpperCase() + name.slice(1)} must contain only letters.`;
      }
    }

    if (name === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        error = "Enter a valid email address.";
      }
    }

    if (name === "password") {
      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordPattern.test(value)) {
        error =
          "Password must be at least 8 characters long, contain at least one uppercase letter, one number, and one special character.";
      }
    }

    if (name === "confirmPassword") {
      if (value !== user.password) {
        error = "Passwords do not match!";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));

    validateField(name, value); // Validate the field while typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setErrors({});

    // Final validation before submitting
    Object.keys(user).forEach((field) => validateField(field, user[field]));

    // Check if there are any errors before proceeding
    if (Object.values(errors).some((error) => error)) {
      return;
    }

    try {
      const response = await axios.post("https://localhost:7030/api/Auth/Register", user, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 200) {
        setMessage("OTP sent to your email. Please verify to complete registration.");
        setIsOtpSent(true);
      }
    } catch (error) {
      console.error("Registration Error:", error);
      setMessage(error.response?.data?.message || "Registration failed. Please try again.");
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
              <label><b>First Name</b></label>
              <input type="text" name="firstName" placeholder="Enter First Name" value={user.firstName} onChange={handleChange} />
              {errors.firstName && <p className="register-page-form-flight-error">{errors.firstName}</p>}

              <label><b>Last Name</b></label>
              <input type="text" name="lastName" placeholder="Enter Last Name" value={user.lastName} onChange={handleChange} />
              {errors.lastName && <p className="register-page-form-flight-error">{errors.lastName}</p>}

              <label><b>Email</b></label>
              <input type="email" name="email" placeholder="Enter Email" value={user.email} onChange={handleChange} />
              {errors.email && <p className="register-page-form-flight-error">{errors.email}</p>}

              <label><b>Password</b></label>
              <input type="password" name="password" placeholder="Enter Password" value={user.password} onChange={handleChange} />
              {errors.password && <p className="register-page-form-flight-error">{errors.password}</p>}

              <label><b>Confirm Password</b></label>
              <input type="password" name="confirmPassword" placeholder="Confirm Password" value={user.confirmPassword} onChange={handleChange} />
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
