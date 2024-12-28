
// Import necessary libraries
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Registration.css'; // Custom CSS file
import { useNavigate, Link } from 'react-router-dom';
const Registration = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
const navigate = useNavigate();
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    navigate('/login');

    try {
      const response = await axios.post('https://psquare-assignment.vercel.app/api/auth/register', formData);
      setSuccessMessage(response.data.message);
      setFormData({ fullName: '', email: '', password: '' }); // Reset form
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Something went wrong. Please try again later.');
      }
    }
  };

  return (
    <div className="container-fluid registration-page d-flex align-items-center justify-content-center">
      <div className="row registration-container">
        {/* Left Section */}
        <div className="col-md-6 registration-form-section">
          <div className="text-center mb-4">
            <div className="logo-placeholder mb-3">LOGO</div>
            <h2>Welcome to Dashboard</h2>
          </div>
          <form onSubmit={handleSubmit}>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <div className="mb-3">
              <label htmlFor="fullName" className="form-label">Full name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Full name"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <span className="input-group-text"><i className="bi bi-eye-slash"></i></span>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-100">Register</button>
          </form>
          <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>
        </div>

        {/* Right Section */}
        <div className="col-md-6 registration-info-section d-none d-md-flex">
          <div className="info-content text-center">
            <i className="bi bi-android2"></i>
            <p>If you have already registered, click the Login button and enter your username and password.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
