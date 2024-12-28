import React, { useState,useEffect } from 'react';
import Sidebar from '../components/Sidebar/Sidebar.js';
import Navbar from '../components/Navbar/Navbar.js';
import CandidateForm from "../components/Candidate/CandidateForm.js";
import CandidateList from '../components/Candidate/CandidateList.js';
import CandidateHeader from '../components/Candidate/CandidateHeader.js';
const Candidates = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [candidates, setCandidates] = useState([]); 

  const handleModalClose = () => setShowModal(false); // Close the modal
  const handleModalShow = () => setShowModal(true); // Open the modal

  const handleAddCandidate = (newCandidate) => {
    setCandidates((prevCandidates) => [newCandidate, ...prevCandidates]);
  };
  

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <CandidateHeader />
        <Navbar onSearch={setSearchTerm} />
        <div style={{ float: "right", margin: "1rem" }}>
          {/* Button to trigger the modal */}
          <button className="btn btn-primary" onClick={handleModalShow}>
            Add Candidate
          </button>
        </div>

        {/* Candidate List Component */}
        <CandidateList searchTerm={searchTerm} candidates={candidates} />

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="close-btn" onClick={handleModalClose}>
                &times;
              </button>
              <CandidateForm onAddCandidate={handleAddCandidate} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Candidates;
