import express from 'express';

import {
  getAllCandidates,
  createCandidate,
  updateCandidateStatus,
  deleteCandidate,
} from '../controllers/candidateController.js';
import { authenticateToken } from '../middlewares/authMiddlewares.js';
const canrouter = express.Router();

// Route to get all candidates
canrouter.get('/',authenticateToken, getAllCandidates);

// Route to create a new candidate with resume upload
canrouter.post('/',authenticateToken, createCandidate);

// Route to update candidate status
canrouter.put('/:id',authenticateToken, updateCandidateStatus);

// Route to delete a candidate
canrouter.delete('/:id',authenticateToken, deleteCandidate);

export default canrouter;
