import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import EmployeeForm from '../components/Employee/EmployeeForm';
import EmployeeList from '../components/Employee/EmployeeList';
import EmployeeHeader from '../components/Employee/EmployeeHeader';


//import './Candidates.css';

const Employees = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const handleModalClose = () => setShowModal(false); // Close the modal
  const handleModalShow = () => setShowModal(true); // Open the modal

  return (
     <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <EmployeeHeader/>
        <Navbar onSearch={setSearchTerm} />
        <div style={{float:"right",margin:"1rem"}}>
          {/* Button to trigger the modal */}
          <button className="btn btn-primary" onClick={handleModalShow}>
            Add Employee
          </button>
        </div>

        {/* Candidate List Component */}
        <EmployeeList searchTerm={searchTerm} />

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={handleModalClose}>
                &times;
              </button>
              <EmployeeForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;


