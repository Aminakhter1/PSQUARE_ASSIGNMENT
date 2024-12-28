
import React, { useState, useEffect } from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import LeaveHeader from './LeaveHeader';

const LeaveManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [leaveData, setLeaveData] = useState([]);
  const token = localStorage.getItem('token');
  const [formData, setFormData] = useState({
    employeeId: '',
    startDate: '',
    endDate: '',
    reason: '',
  });
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch leave data
    const fetchLeaveData = async () => {
      try {
        const response = await axios.get('https://psquare-assignment.vercel.app/api/leaves', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLeaveData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching leave data:', error);
      }
    };

    // Fetch employee data
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://psquare-assignment.vercel.app/api/employees', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmployees(response.data.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchLeaveData();
    fetchEmployees();
  }, [token]);

  // Filtered leave data based on search term
  const filteredLeaveData = leaveData.filter((leave) => {
    const searchTermLower = searchTerm.toLowerCase();

    // Add checks to prevent undefined or null values
    return (
      (leave.employeeId?.fullName?.toLowerCase().includes(searchTermLower) || 
      leave.employeeId?.position?.toLowerCase().includes(searchTermLower) ||
      leave.reason?.toLowerCase().includes(searchTermLower))
    );
  });

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://psquare-assignment.vercel.app/api/leaves', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert(response.data.message);
      setLeaveData([...leaveData, response.data.leave]);
      setFormData({ employeeId: '', startDate: '', endDate: '', reason: '' });
      handleModalClose();
    } catch (error) {
      console.error('Error submitting leave request:', error);
    }
  };

  const updateStatus = async (leaveId, newStatus) => {
    console.log(`Updating leave with ID: ${leaveId} to status: ${newStatus}`);

    try {
      const response = await axios.patch(
        `https://psquare-assignment.vercel.app/api/leaves/${leaveId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      setLeaveData((prevData) =>
        prevData.map((leave) =>
          leave._id === leaveId ? { ...leave, status: newStatus } : leave
        )
      );
    } catch (error) {
      console.error('Error updating leave status:', error);
    }
  };

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <LeaveHeader />
        <Navbar onSearch={setSearchTerm} />

        <div style={{ float: 'right', margin: '1rem' }}>
          <button className="btn btn-primary" onClick={handleModalShow}>
            Add Leave
          </button>
        </div>

        {/* Leave List */}
        <div className="leave-list">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Leave Start Date</th>
                <th>Leave End Date</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredLeaveData.map((leave, index) => (
                <tr key={index}>
                  <td>{leave.employeeId?.fullName}</td>
                  <td>{leave.employeeId?.position}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <select
                      value={leave.status}
                      onChange={(e) => updateStatus(leave._id, e.target.value)}
                      className="form-control"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Approved">Approved</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Leave Modal */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3 style={{ backgroundColor: 'orange', padding: '1rem' }}>Add Leave</h3>
              <button className="close-btn" onClick={handleModalClose}>
                &times;
              </button>
              <form onSubmit={handleSubmit}>
                {/* Employee Dropdown */}
                <div className="form-group">
                  <label>Employee</label>
                  <select
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    required
                    className="form-control"
                  >
                    <option value="" disabled>
                      Select an employee
                    </option>
                    {employees.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.fullName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Start Date */}
                <div className="form-group">
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                {/* End Date */}
                <div className="form-group">
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                {/* Reason */}
                <div className="form-group">
                  <label>Reason</label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    required
                    className="form-control"
                  />
                </div>

                {/* Submit Button */}
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveManagement;
