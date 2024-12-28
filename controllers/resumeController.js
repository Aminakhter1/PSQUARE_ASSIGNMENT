import Candidate from "../models/candidateSchema.js";

// Controller for fetching a candidate's resume
export const downloadResume = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate || !candidate.resume.data) {
      return res.status(404).send('Resume not found.');
    }

    // Set headers for file download
    res.set('Content-Type', candidate.resume.contentType);
    res.set('Content-Disposition', `attachment; filename=resume_${candidate._id}.${candidate.resume.contentType.split('/')[1]}`);

    // Send the resume file as the response
    res.send(candidate.resume.data);
  } catch (error) {
    console.error('Error fetching resume:', error);
    res.status(500).send('Server Error');
  }
};
