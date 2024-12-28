import Candidate from "../models/candidateSchema.js";

//import slugify from "slugify";


 // Import the Candidate model
import fs from "fs";

// Controller for creating a candidate
export const createCandidate = async (req, res) => {
  try {
    // Extract the necessary fields from the request body
    const { fullName, email, phoneNumber, department, experience, status } = req.body;

    // File handling (Buffer)
    const resumeFile = req.files?.resume;
    if (!resumeFile) {
      return res.status(400).json({ success: false, message: "Resume file is required." });
    }

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !department || !experience || !status) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    // Convert file to buffer
    const resumeBuffer = resumeFile.data; // Buffer of the file content
    const resumeContentType = resumeFile.mimetype; // Store content type (PDF or image)

    // Create a new candidate document
    const newCandidate = new Candidate({
      fullName,
      email,
      phoneNumber,
      department,
      experience,
      status,
      resume: { data: resumeBuffer, contentType: resumeContentType }, // Store the file data as a buffer
    });

    // Save the candidate to the database
    await newCandidate.save();

    // Send a success response
    return res.status(200).json({ success: true, message: 'Candidate added successfully' });

  } catch (error) {
    console.error('Error while adding candidate:', error);
    return res.status(500).json({ success: false, message: 'Error saving candidate to the database' });
  }
};


   

// Get all candidates
export const getAllCandidates = async (req, res) => {
    try {
      const candidates = await Candidate.find();
    
      res.status(200).json({ success: true, data: candidates });
    } catch (error) {
      
    console.log(error);}
  
  };
  // Update candidate data and status
export const updateCandidateStatus = async (req, res) => {
  try {
    const { status, fullName, email, phoneNumber, department, experience } = req.body; // Extract fields from request body

    // Find and update the candidate
    const candidate = await Candidate.findByIdAndUpdate(
      req.params.id,
      { 
        status,
        fullName,
        email,
        phoneNumber,
        department,
        experience,
      },
      { new: true } // Return the updated document
    );

    if (!candidate) {
      return res.status(404).json({ success: false, message: 'Candidate not found' });
    }

    res.status(200).json({ success: true, data: candidate });
  } catch (error) {
    console.error('Error updating candidate:', error.message);
    res.status(500).json({ success: false, message: 'Failed to update candidate', error: error.message });
  }
};


  // Delete a candidate
export const deleteCandidate = async (req, res) => {
    try {
      await Candidate.findByIdAndDelete(req.params.id);
      res.status(200).json({ success: true, message: 'Candidate deleted successfully' });
    } catch (error) {
      console.log(error);
  
    }
  };



 




