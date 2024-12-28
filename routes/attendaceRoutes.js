import express from 'express';
import {
getAllAttendance,
  createDefaultAttendance,
  updateAttendance,
  deleteAttendance,
} from '../controllers/attendanceController.js';
import { authenticateToken } from '../middlewares/authMiddlewares.js';
const attendanceRouter = express.Router();

// Route to fetch all attendance records
//attendanceRouter.get('/', getAllAttendance);

// Route to create default attendance for all employees
attendanceRouter.post('/default',authenticateToken, createDefaultAttendance);

// Route to update attendance (status and task)
attendanceRouter.patch('/:id',authenticateToken, updateAttendance);

// Route to delete an attendance record
attendanceRouter.delete('/:id',authenticateToken, deleteAttendance);
attendanceRouter.get("/all",authenticateToken, getAllAttendance);

export default attendanceRouter;
