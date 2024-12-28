
import express from 'express';
import {
createLeave,getAllLeaves,deleteLeave,
updateLeaveStatus
} from "../controllers/leaveController.js";
import { authenticateToken } from '../middlewares/authMiddlewares.js';
const leaveRouter = express.Router();

// Create Leave
leaveRouter.post('/leaves',authenticateToken, createLeave);

// Get All Leaves
leaveRouter.get('/leaves',authenticateToken, getAllLeaves);

// Update Leave Status
leaveRouter.patch('/leaves/:leaveId',authenticateToken,updateLeaveStatus);

// Delete Leave
leaveRouter.delete('/leaves/:leaveId',authenticateToken, deleteLeave);

export default leaveRouter;