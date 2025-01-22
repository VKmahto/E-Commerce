import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Register = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    contact_no: "",
    username: "",
    password: "",
    email: "",
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:2000/shopapp/api/register/", formData)
      alert(response.data.message)
      navigate("/login")
    } catch (error) {
      alert("Registration failed. Please try again.")
      console.error("Registration error:", error.response ? error.response.data : error.message)
    }
  }

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
        <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
          <div className="card mb-4" style={{ width: "100%", maxWidth: "500px" }}>
            <div className="card-body">
              {/* Navbar with Registration Heading */}
              <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
                <h4 className="card-title text-center">Registration</h4>
              </nav>

              <br />

              {/* Registration Form */}
              <form className="w-75 mx-auto" onSubmit={handleSubmit}>
                {/* Name and Contact Number */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="contact_no" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      className="form-control"
                      id="contact_no"
                      name="contact_no"
                      placeholder="Enter contact number"
                      value={formData.contact_no}
                      onChange={handleChange}
                      maxLength={10}
                      required
                    />
                  </div>
                </div>

                {/* Username and Password */}
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="username" className="form-label">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      placeholder="Enter a username"
                      value={formData.username}
                      onChange={handleChange}
                    
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="row mb-3">
                  <div>
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      placeholder="Enter your email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-primary w-100 mb-3">
                  Register
                </button>
              </form>

              {/* Already Have Account? */}
              <p className="mt-3 text-center">
                Already have an account? <a href="/login">Login here</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register

