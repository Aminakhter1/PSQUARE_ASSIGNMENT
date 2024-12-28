import express from 'express';

import {
  getAllEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from '../controllers/employeeController.js';
import { authenticateToken } from '../middlewares/authMiddlewares.js';
const employeerouter = express.Router();

// Route to get all employees
employeerouter.get('/',authenticateToken, getAllEmployees);

// Route to create a new employee
employeerouter.post('/',authenticateToken, createEmployee);

// Route to update an employee's details
employeerouter.patch('/:id',authenticateToken, updateEmployee);

// Route to delete an employee
employeerouter.delete('/:id',authenticateToken, deleteEmployee);

export default employeerouter;
