
import Employee from '../models/employeeSchema.js';
import Attendance from '../models/AttendanceSchema.js';
// Fetch all attendance records with employee details
import mongoose from "mongoose";
// Create default attendance for all employees

export const createDefaultAttendance = async (req, res) => {
  try {
    // Get all employees from the database
    const employees = await Employee.find();

    if (!employees || employees.length === 0) {
      return res.status(404).json({ message: "No employees found to create attendance" });
    }

    // Check if attendance already exists for employees on the current date
    const currentDate = new Date().toISOString().slice(0, 10); // Today's date in YYYY-MM-DD format

    // Create default attendance records for each employee
    const attendanceRecords = employees.map((employee) => ({
      employeeId: employee._id,
      fullName: employee.fullName,
      date: currentDate,
      task: "", // Default task
      status: "Absent", // Default status
    }));

    // Insert only new attendance records that don't already exist for today
    for (let record of attendanceRecords) {
      const existingRecord = await Attendance.findOne({
        employeeId: record.employeeId,
        date: record.date, // Check for existing record on the same date
      });

      if (!existingRecord) {
        // Insert the attendance record if it doesn't exist
        await Attendance.create(record);
      }
    }

    res.status(200).json({ message: "Default attendance created successfully" });
  } catch (error) {
    console.error("Error creating default attendance:", error);
    res.status(500).json({ message: "Error creating default attendance" });
  }
};

// Get all attendance records

// Get all attendance records with employee names
export const getAllAttendance = async (req, res) => {
  try {
    // Fetch attendance and populate the employee's name
    const attendanceRecords = await Attendance.find()
      .populate("employeeId", "fullName") // Populate the employee's fullName field
      .exec();

    if (!attendanceRecords) {
      return res.status(404).json({ message: "No attendance records found" });
    }

    res.status(200).json({ data: attendanceRecords });
  } catch (error) {
    console.error("Error fetching attendance records:", error);
    res.status(500).json({ message: "Error fetching attendance records" });
  }
};

  // Controller for updating attendance record by ID

  
export const updateAttendance = async (req, res) => {
  const { id } = req.params; // Extracting attendance ID from URL params
  const { status, task } = req.body; // Extracting status and task from request body

  // Basic validation of input fields
  if (!status || !task) {
    return res.status(400).json({ message: "Both status and task are required" });
  }

  try {
    // Validate the id to ensure it's a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid attendance ID" });
    }

    // Find and update attendance record by its ID
    const attendance = await Attendance.findByIdAndUpdate(
      id,
      { status, task },
      { new: true } // Return the updated document
    );

    // If no attendance is found with the provided ID
    if (!attendance) {
      return res.status(404).json({ message: "Attendance record not found" });
    }

    // Return success response
    res.status(200).json({ message: "Attendance updated successfully", data: attendance });
  } catch (error) {
    console.error("Error updating attendance:", error);
    res.status(500).json({ message: "Error updating attendance record" });
  }
};
// Controller for deleting attendance record by ID
export const deleteAttendance = async (req, res) => {
    const { id } = req.params;
  
    try {
      // Find and delete the attendance record by its ID
      const attendance = await Attendance.findByIdAndDelete(id);
  
      if (!attendance) {
        return res.status(404).json({ message: "Attendance record not found" });
      }
  
      res.status(200).json({ message: "Attendance record deleted successfully" });
    } catch (error) {
      console.error("Error deleting attendance:", error);
      res.status(500).json({ message: "Error deleting attendance record" });
    }
  };
  