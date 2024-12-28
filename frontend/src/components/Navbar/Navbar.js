import React from 'react';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <input
        type="text"
        placeholder="Search..."
        className="navbar-search"
        onChange={(e) => onSearch(e.target.value)}
      />
      
      <div className="navbar-icons">
        <i className="fa fa-bell"></i>
        <i className="fa fa-user-circle"></i>
      </div>
    </nav>
  );
};

export default Navbar;
