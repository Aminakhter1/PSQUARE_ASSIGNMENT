import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const CandidateForm = ({ onAddCandidate }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const [status, setStatus] = useState("");
  const [resume, setResume] = useState(null);
  const [resumePreview, setResumePreview] = useState("");
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    //e.preventDefault();

    // Validate inputs before sending to server
    if (!fullName || !email || !phoneNumber || !department || !experience || !resume) {
      alert("All fields are required.");
      return;
    }

    try {
      const candidateData = new FormData();
      candidateData.append("fullName", fullName);
      candidateData.append("email", email);
      candidateData.append("phoneNumber", phoneNumber);
      candidateData.append("department", department);
      candidateData.append("experience", experience);
      candidateData.append("status", status);
      candidateData.append("resume", resume); // Add the file

      const { data } = await axios.post(
        "https://psquare-assignment.vercel.app/api/candidates",
        candidateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        alert("Candidate added successfully!");
        resetForm();
        navigate("/");
        onAddCandidate(candidateData);  // Update the parent component state with the new candidate
      } else {
        alert("Failed to add candidate. Please try again.");
      }
    } catch (error) {
      console.error("Error while adding candidate:", error.response?.data || error.message);
      alert("An error occurred. Please check the console for details.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setResume(file);

    // Generate preview for images
    if (file && file.type.startsWith("image/")) {
      setResumePreview(URL.createObjectURL(file));
    } else {
      setResumePreview(""); // Clear preview for non-image files
    }
  };

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setPhoneNumber("");
    setDepartment("");
    setExperience("");
    setStatus("New");
    setResume(null);
    setResumePreview("");
  };

  return (
    <div className="container-fluid p-3">
      <div className="row">
        <div className="col-md-9">
          <div className="">
            <h3 style={{ backgroundColor: "orange", padding: "1rem" }}>Add Candidate</h3>
            <form onSubmit={handleCreate}>
              <div className="mb-3">
                <input
                  type="text"
                  value={fullName}
                  placeholder="Write a name"
                  className="form-control"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  value={email}
                  placeholder="Write an email"
                  className="form-control"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={phoneNumber}
                  placeholder="Write a phone number"
                  className="form-control"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={department}
                  placeholder="Write a department"
                  className="form-control"
                  onChange={(e) => setDepartment(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={experience}
                  placeholder="Write experience in years"
                  className="form-control"
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <select
                  id="status"
                  value={status}
                  className="form-control"
                  onChange={(e) => setStatus(e.target.value)}
                  required
                >
                  <option value="" disabled>Select a status</option>
                  <option value="New">New</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Selected">Selected</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {resume ? resume.name : "Upload Resume (PDF/Image)"}
                  <input
                    type="file"
                    name="resume"
                    accept="application/pdf, image/*"
                    onChange={handleFileChange}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {resume && resume.type === "application/pdf" && (
                  <p className="text-center">PDF Uploaded: {resume.name}</p>
                )}
                {resumePreview && (
                  <div className="text-center">
                    <img
                      src={resumePreview}
                      alt="Uploaded Preview"
                      height="200px"
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" type="submit">Add Candidate</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateForm;
