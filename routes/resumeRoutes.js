import express from "express";
import { downloadResume } from "../controllers/resumeController.js";

const resumerouter = express.Router();

// Route for downloading candidate's resume
resumerouter.get("/res/:id/resume", downloadResume);

export default resumerouter;