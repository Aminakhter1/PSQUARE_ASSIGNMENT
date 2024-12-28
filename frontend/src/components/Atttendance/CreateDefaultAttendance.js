
import React, { useState } from "react";
import axios from "axios";

const CreateDefaultAttendance = () => {
  const [loading, setLoading] = useState(false); // Track loading state
  const [message, setMessage] = useState(""); // Store response message
  const token = localStorage.getItem('token'); // Get the token from local storage

  // Function to call the API to create default attendance
  const handleCreateAttendance = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setMessage(""); // Reset message

      // Make the POST request to create default attendance
      const response = await axios.post(
        "https://psquare-assignment.vercel.app/api/attendance/default",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update message with success response
      setMessage(response.data.message || "Default attendance created successfully!");
    } catch (error) {
      setMessage("Failed to create default attendance. Please try again.");
      console.error("Error creating default attendance:", error);
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }
  };

  return (
    <div className="container mt-4">
      <button
        className="btn btn-primary"
        onClick={handleCreateAttendance}
        disabled={loading} // Disable button when loading
      >
        {loading ? "Creating..." : "Create Default Attendance"}
      </button>

      {message && (
        <div className={`alert ${loading ? "alert-info" : "alert-success"} mt-3`} role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default CreateDefaultAttendance;
