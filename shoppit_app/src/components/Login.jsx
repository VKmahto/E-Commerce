import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.username]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2000/shopapp/api/login/", formData);
      const { token } = response.data;
      localStorage.setItem("token", token); // Save token for future authenticated requests
      alert("Login successful!");
      navigate("/dashboard"); // Redirect to the dashboard or desired page
    } catch (error) {
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="container-fluid vh-100">
      <div className="row h-100">
        {/* Left Side */}
        <div
          className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center text-white text-center bg-dark"
          style={{
            backgroundImage: "url(https://via.placeholder.com/600)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2>SHOPPIT</h2>
        </div>

        {/* Right Side */}
        <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
          <div className="card mb-4" style={{ width: "100%", maxWidth: "500px" }}>
            <div className="card-body">
              <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <h4 className="card-title text-center">Login</h4>
              </nav>
              <br />
              {/* Form */}
              <form className="w-75 mx-auto" onSubmit={handleSubmit}>
                {/* Username or Email */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    placeholder="Username or Email"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Password */}
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                {errorMessage && (
                  <div className="alert alert-danger mb-3" role="alert">
                    {errorMessage}
                  </div>
                )}

                {/* Login Button */}
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Login
                </button>
              </form>

              {/* Social Buttons */}
              <div className="w-75 d-flex justify-content-between mb-3 mx-auto">
                <button className="btn btn-danger w-48">Google</button>
                <button className="btn btn-primary w-48">Facebook</button>
              </div>

              {/* Or Divider */}
              <div className="d-flex align-items-center w-75 mx-auto mb-3">
                <hr className="flex-grow-1 me-2" />
                <span>or</span>
                <hr className="flex-grow-1 ms-2" />
              </div>

              {/* Register Link */}
              <p className="mt-3 text-center">
                Don't have an account? <a href="/register">Register here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
