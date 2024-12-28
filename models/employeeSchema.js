import mongoose from "mongoose";
import Attendance from "./AttendanceSchema.js";
import Leave from "./leaveSchema.js";
const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  department: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  });
  // Pre-delete hook for removing attendance records when an employee is deleted
employeeSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
  try {
    // Remove attendance records associated with this employee
    await Attendance.deleteMany({ employeeId: this._id });
    next(); // Proceed with the deletion of the employee
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});

// Pre-delete middleware for Employee schema
employeeSchema.pre('deleteOne', { document: true, query: false }, async function(next) {
  try {
    // Remove leave records associated with this employee
    await Leave.deleteMany({ employeeId: this._id }); // Deleting leaves linked to the employee's _id
    next(); // Proceed with deleting the employee
  } catch (error) {
    next(error); // Pass any error to the next middleware
  }
});

  
  export default mongoose.model('Employee', employeeSchema);