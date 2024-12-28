
import React, { useState, useEffect } from 'react';
import './CandidateList.css';
import axios from 'axios';
import 'bootstrap-icons/font/bootstrap-icons.css';

const CandidateList = ({ searchTerm }) => {
  const [canlist, setCanlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editCandidate, setEditCandidate] = useState(null); // Candidate to edit
  const token = localStorage.getItem('token');

  // Fetch all candidates
  const fetchAllCandidates = async () => {
    try {
      const response = await axios.get('https://psquare-assignment.vercel.app/api/candidates', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data.data)) {
        setCanlist(response.data.data);
      } else {
        console.error('Unexpected response format:', response.data);
        setCanlist([]);
      }
    } catch (error) {
      console.error('Error fetching candidates', error);
      setCanlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllCandidates();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const response = await axios.put(
        `https://psquare-assignment.vercel.app/api/candidates/${id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedCandidate = response.data.data;

      setCanlist((prevList) =>
        prevList.map((candidate) =>
          candidate._id === id ? { ...candidate, status: updatedCandidate.status } : candidate
        )
      );
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update the status. Please try again.');
    }
  };

  // Handle delete functionality
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this candidate?');
      if (!confirmDelete) return;

      await axios.delete(`https://psquare-assignment.vercel.app/api/candidates/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedCandidates = canlist.filter((candidate) => candidate._id !== id);
      setCanlist(updatedCandidates);

      alert('Candidate deleted successfully!');
    } catch (error) {
      console.error('Error deleting candidate:', error);
      alert('Failed to delete the candidate. Please try again.');
    }
  };

  // Handle resume download
  const handleDownload = async (id) => {
    try {
      const response = await axios.get(`https://psquare-assignment.vercel.app/api/res/${id}/resume`, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${token}` },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `resume_${id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download the resume. Please try again.');
    }
  };

  // Handle edit candidate
  const handleEdit = (candidate) => {
    setEditCandidate(candidate); // Set the candidate to edit
  };

  // Handle save edited candidate
  const handleSaveEdit = async () => {
    try {
      const { _id, fullName, email, phoneNumber, department, experience } = editCandidate;

      const response = await axios.put(
        `https://psquare-assignment.vercel.app/api/candidates/${_id}`,
        { fullName, email, phoneNumber, department, experience },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCandidate = response.data.data;
      setCanlist((prevList) =>
        prevList.map((candidate) =>
          candidate._id === updatedCandidate._id ? updatedCandidate : candidate
        )
      );

      alert('Candidate updated successfully!');
      setEditCandidate(null); // Close the edit form
    } catch (error) {
      console.error('Error updating candidate:', error);
      alert('Failed to update the candidate. Please try again.');
    }
  };

  // Filter candidates based on searchTerm
  const filteredCandidates = canlist.filter((candidate) => {
    return (
      candidate.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      candidate.phoneNumber.includes(searchTerm)
    );
  });

  return (
    <div className="candidate-list">
      {loading ? (
        <div className="loading">
          <i className="bi bi-spinner" style={{ fontSize: '30px', animation: 'spin 2s linear infinite' }}></i>
          <p>Loading candidates...</p>
        </div>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>S No</th>
              <th>Name</th>
              <th>Email</th>
              <th>PhoneNo.</th>
              <th>Department</th>
              <th>Experience</th>
              <th>Status</th>
              
              <th>Resume</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.length > 0 ? (
              filteredCandidates.map((candidate, index) => (
                <tr key={candidate._id}>
                  <td>{index + 1}</td>
                  <td>{candidate.fullName}</td>
                  <td>{candidate.email}</td>
                  <td>{candidate.phoneNumber}</td>
                  <td>{candidate.department}</td>
                  <td>{candidate.experience}</td>
                  <td>
                    <select
                      value={candidate.status}
                      onChange={(e) => handleStatusUpdate(candidate._id, e.target.value)}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  
                  <td>
                    <button onClick={() => handleDownload(candidate._id)}>
                      <i className="bi bi-download"></i>
                    </button>
                  </td>
                  <td>
                    <button onClick={() => handleEdit(candidate)}>Edit</button>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(candidate._id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No candidates found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Edit Candidate Modal */}
      {editCandidate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Candidate</h3>
            <label>Name:</label>
            <input
              type="text"
              value={editCandidate.fullName}
              onChange={(e) =>
                setEditCandidate({ ...editCandidate, fullName: e.target.value })
              }
            />
            <label>Email:</label>
            <input
              type="email"
              value={editCandidate.email}
              onChange={(e) =>
                setEditCandidate({ ...editCandidate, email: e.target.value })
              }
            />
            <label>Phone:</label>
            <input
              type="text"
              value={editCandidate.phoneNumber}
              onChange={(e) =>
                setEditCandidate({ ...editCandidate, phoneNumber: e.target.value })
              }
            />
            <label>Department:</label>
            <input
              type="text"
              value={editCandidate.department}
              onChange={(e) =>
                setEditCandidate({ ...editCandidate, department: e.target.value })
              }
            />
            <label>Experience:</label>
            <input
              type="text"
              value={editCandidate.experience}
              onChange={(e) =>
                setEditCandidate({ ...editCandidate, experience: e.target.value })
              }
            />
            <div className="modal-actions">
              <button className="btn btn-primary" onClick={handleSaveEdit}>
                Save
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => setEditCandidate(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CandidateList;
