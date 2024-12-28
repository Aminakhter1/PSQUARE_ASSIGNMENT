import React, { useState } from 'react';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import AttendanceHeader from '../components/Atttendance/AttendanceHeader';
import AttendanceList from '../components/Atttendance/AttendanceList';
import CreateDefaultAttendance from '../components/Atttendance/CreateDefaultAttendance';

//import './Candidates.css';

const Attendances = () => {

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state

  const handleModalClose = () => setShowModal(false); // Close the modal
  const handleModalShow = () => setShowModal(true); // Open the modal

  return (
     <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <AttendanceHeader/>
        <Navbar onSearch={setSearchTerm} />
        <div style={{float:"right",margin:"1rem"}}>
          {/* Button to trigger the modal */}
          <CreateDefaultAttendance/>
        </div>

        {/* Attendance List Component */}
    <AttendanceList/>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={handleModalClose}>
                &times;
              </button>
            
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Attendances;


