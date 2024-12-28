// Import necessary libraries
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Login.css'; // Custom CSS file
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('https://psquare-assignment.vercel.app/api/auth/login', formData);

      const token = response.data.token;
      if (!token) {
        throw new Error('Token not received');
      }

      // Store the token in localStorage
      localStorage.setItem('token', token);
      console.log(token);

      // Redirect to the candidates page
      navigate('/candidates');
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
            <h2>Login to Dashboard</h2>
          </div>
          <form onSubmit={handleSubmit}>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
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

            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>
          <p className="text-center mt-3">Don't have an account? <Link to="/">Register</Link></p>
        </div>

        {/* Right Section */}
        <div className="col-md-6 registration-info-section d-none d-md-flex">
          <div className="info-content text-center">
            <i className="bi bi-android2"></i>
            <p>If you don't have an account, click the Register button to create one.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
