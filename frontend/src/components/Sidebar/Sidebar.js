
// Import necessary libraries
import React from 'react';
import './Sidebar.css';
import { Link, useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('token'); // Clear authentication token
      alert('You have been logged out!');
      navigate('/login');
    }
  };

  const menuItems = [
    { name: 'Candidates', icon: 'bi-person-plus', route: '/candidates' },
    { name: 'Employees', icon: 'bi-people-fill', route: '/employees' },
    { name: 'Attendance', icon: 'bi-reception-4', route: '/attendance' },
    { name: 'Leaves', icon: 'bi-stars', route: '/leave' },
    { name: 'Logout', icon: 'bi-box-arrow-in-right', action: handleLogout },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo"><i class="bi bi-square"></i> LOGO</div>
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index}>
            {item.action ? (
              <button onClick={item.action} className="sidebar-link">
                <i className={`bi ${item.icon}`}></i>
                {item.name}
              </button>
            ) : (
              <Link to={item.route} className="sidebar-link">
                <i className={`bi ${item.icon}`}></i>
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
