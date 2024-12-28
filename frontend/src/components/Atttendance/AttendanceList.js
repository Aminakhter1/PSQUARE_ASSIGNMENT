
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const AttendanceList = () => {
  const [attendanceList, setAttendanceList] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch all attendance records
  const fetchAttendance = async () => {
    try {
      const response = await axios.get("https://psquare-assignment.vercel.app/api/attendance/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const attendanceRecords = response.data.data;

      if (Array.isArray(attendanceRecords)) {
        setAttendanceList(attendanceRecords);
      } else {
        console.error("Expected attendance data to be an array, but got:", attendanceRecords);
      }
    } catch (error) {
      console.error("Error fetching attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  // Handle updating an attendance record
  const handleUpdate = async (index, updatedRecord) => {
    try {
      const { _id, status, task } = updatedRecord;
      const payload = { status, task };

      // Send the update request to the backend
      const response = await axios.patch(
        `https://psquare-assignment.vercel.app/api/attendance/${_id}`,
        payload, // Correct way to send the body as payload
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // If update is successful, update the local state
      if (response.status === 200) {
        const updatedList = [...attendanceList];
        updatedList[index] = response.data.data;  // Replace the updated record
        setAttendanceList(updatedList);

        alert("Attendance updated successfully!");
      }
    } catch (error) {
      console.error("Error updating attendance:", error);
      alert("Failed to update attendance. Please try again.");
    }
  };

  // Handle deleting an attendance record
  const handleDelete = async (attendanceId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this attendance record?");
      if (!confirmDelete) return;

      // Send delete request to the backend
      const response = await axios.delete(`https://psquare-assignment.vercel.app/api/attendance/${attendanceId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // If deletion is successful, update the local state
      if (response.status === 200) {
        setAttendanceList(attendanceList.filter((record) => record._id !== attendanceId));
        alert("Attendance deleted successfully!");
      }
    } catch (error) {
      console.error("Error deleting attendance:", error);
      alert("Failed to delete attendance. Please try again.");
    }
  };

  return (
    <div className="attendance-list">
      <h3>Attendance List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>S No</th>
            <th>Name</th>
            <th>Date</th>
            <th>Task</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceList.length > 0 ? (
            attendanceList.map((record, index) => (
              <tr key={record._id}>
                <td>{index + 1}</td>
                <td>{record.employeeId.fullName}</td> {/* Use employee's fullName from populated data */}
                <td>{record.date}</td>
                <td>
                  <input
                    type="text"
                    value={record.task}
                    onChange={(e) => {
                      const updatedRecord = { ...record, task: e.target.value };
                      setAttendanceList((prev) =>
                        prev.map((item, idx) => (idx === index ? updatedRecord : item))
                      );
                    }}
                  />
                </td>
                <td>
                  <select
                    value={record.status}
                    onChange={(e) => {
                      const updatedRecord = { ...record, status: e.target.value };
                      setAttendanceList((prev) =>
                        prev.map((item, idx) => (idx === index ? updatedRecord : item))
                      );
                    }}
                  >
                    <option value="Absent">Absent</option>
                    <option value="Present">Present</option>
                    <option value="Medical Leave">Medical Leave</option>
                    <option value="Work From Home">Work From Home</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleUpdate(index, record)}
                  >
                    Save
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(record._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No attendance records found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;
