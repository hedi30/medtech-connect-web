import React, { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import medtechImage from "../assets/medtech.jpg"; // Correct path
import "../styles/login.css"; // Import the external CSS
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    axios
      .post("http://209.38.178.0/api/auth/admin/login", user, {
        withCredentials: true, // ✅ Include cookies in request
      })
      .then((response) => {
        const token = response.data.token;
        localStorage.setItem("token", token);
  
        // Navigate to /admin after successful login
        navigate("/admin/dashboard");
      })
      .catch((error) => {
        const errorMsg = error.response?.data?.msg || "Login failed. Please try again.";
        alert(errorMsg); // ✅ Display error message in an alert
      });
  };
  
  
  return (
    <div className="login_wrapper">
      {/* Left Side - Image */}
      <div className="image_container">
        <img src={medtechImage} alt="MedTech" />
      </div>

      {/* Right Side - Form */}
      <form className="form_container" onSubmit={handleSubmit}>
        <div className="logo_container"></div>
        <div className="title_container">
          <p className="title">MedtechConnect</p>
          <span className="subtitle">
            Get started with our app, just log in and enjoy the experience.
          </span>
        </div>

        {/* Email Input */}
        <div className="input_container">
          <label className="input_label" htmlFor="email">
            Email
          </label>
          <div className="input_with_icon">
            <FaEnvelope className="input_icon" />
            <input
              placeholder="name@mail.com"
              type="text"
              className="input_field"
              id="email"
              value={user.email}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="input_container">
          <label className="input_label" htmlFor="password">
            Password
          </label>
          <div className="input_with_icon">
            <FaLock className="input_icon" />
            <input
              placeholder="••••••••"
              type={passwordVisible ? "text" : "password"}
              className="input_field"
              id="password"
              value={user.password}
              onChange={handleChange}
            />
            <div className="eye_icon" onClick={togglePasswordVisibility}>
              {passwordVisible ? <FaEyeSlash /> : <FaEye />}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="submit_button">
          Login
        </button>

        <hr className="divider" />

        {/* Forgot Password Link */}
        <a href="/forgot-password" className="forgot-password">
          Forgot Password?
        </a>
      </form>
    </div>
  );
};

export default Login;
