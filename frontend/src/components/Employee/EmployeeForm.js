import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  

  const handleCreate = async (e) => {
    //e.preventDefault();

    // Validate inputs before sending to server
    if (!fullName || !email || !phoneNumber || !position || !department || !dateOfJoining) {
      alert("All fields are required.");
      return;
    }

    try {
      const employeeData = {
        fullName,
        email,
        phoneNumber,
        position,
        department,
        dateOfJoining,
      };

      // Debugging: Log data before sending
      console.log("Employee Data:", employeeData);

    const { data } = await axios.post("https://psquare-assignment.vercel.app/api/employees", employeeData,{ headers: {
      Authorization: `Bearer ${token}`,
    }});

      if (data?.success) {
        alert("Employee added successfully!");
        resetForm();
      
        navigate("/employees");
      } else {
        alert("Failed to add employee. Please try again.");
      }
    } catch (error) {
      console.error("Error while adding employee:", error.response?.data || error.message);
      alert("An error occurred. Please check the console for details.");
    }
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setPosition("");
    setDepartment("");
    setDateOfJoining("");
  };

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-9">
          <div className="">
            <h3 style={{ backgroundColor: "orange", padding: "1rem" }}>Add Employee</h3>
            <form onSubmit={handleCreate}>
              <div className="mb-3">
                <input
                  type="text"
                  value={fullName}
                  placeholder="Full Name"
                  className="form-control"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  placeholder="Email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={phoneNumber}
                  placeholder="Phone Number"
                  className="form-control"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={position}
                  placeholder="Position"
                  className="form-control"
                  onChange={(e) => setPosition(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={department}
                  placeholder="Department"
                  className="form-control"
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dateOfJoining" className="form-label">Date of Joining</label>
                <input
                  type="date"
                  id="dateOfJoining"
                  value={dateOfJoining}
                  className="form-control"
                  onChange={(e) => setDateOfJoining(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" type="submit">
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeForm;
