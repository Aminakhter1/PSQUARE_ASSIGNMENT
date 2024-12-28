
import React, { useState, useEffect } from 'react';
import './EmployeeList.css';
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';

const EmployeeList = ({ searchTerm }) => {
  const [employeeList, setEmployeeList] = useState([]);
  const token = localStorage.getItem('token');
  // Fetch all employees
  const fetchAllEmployees = async () => {
    try {
      const response = await axios.get("https://psquare-assignment.vercel.app/api/employees",{ headers: {
        Authorization: `Bearer ${token}`,
      }});

      // Access the array in response.data.data
      if (Array.isArray(response.data.data)) {
        setEmployeeList(response.data.data); // Set the employees list correctly
      } else {
        console.error("Unexpected response format:", response.data);
        setEmployeeList([]); // Handle error by setting an empty array
      }
      console.log(response.data); // Log the response for debugging
    } catch (error) {
      console.error("Error fetching Employees", error);
      setEmployeeList([]); // Handle error by setting an empty array
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, []); // Empty dependency array ensures this runs once on mount

  // Filter employees based on searchTerm
  const filteredEmployees = employeeList.filter((employee) => {
    return (
      employee.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.phoneNumber.includes(searchTerm)
    );
  });

  // Delete employee by ID
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this employee?");
      if (!confirmDelete) return;

      // Make an API call to delete the employee
    await axios.delete(`https://psquare-assignment.vercel.app/api/employees/${id}`,{ headers: {
      Authorization: `Bearer ${token}`,
    }});

      // Automatically fetch and update the employees list after deletion
      const updatedEmployees = employeeList.filter((employee) => employee._id !== id);
      setEmployeeList(updatedEmployees);

      alert("Employee deleted successfully!");
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert("Failed to delete the employee. Please try again.");
    }
  };

  return (
    <div className="employee-list">
      <table className="table">
        <thead>
          <tr>
            <th>S No</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Phone No.</th>
            <th>Position</th>
            <th>Department</th>
            <th>Date of Joining</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((employee, index) => (
              <tr key={employee._id}>
                <td>{index + 1}</td>
                <td>{employee.fullName}</td>
                <td>{employee.email}</td>
                <td>{employee.phoneNumber}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>{new Date(employee.dateOfJoining).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(employee._id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No employees found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
