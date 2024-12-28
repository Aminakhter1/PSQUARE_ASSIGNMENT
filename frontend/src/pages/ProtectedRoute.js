import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children; // If token exists, allow access to the route
};

export default ProtectedRoute;
