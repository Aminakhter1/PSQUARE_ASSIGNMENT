// Backend Code: Leave Management System

// Importing Required Modules
import Leave from "../models/leaveSchema.js";
// Controller Functions
      import Employee from "../models/employeeSchema.js";
// Create a new leave request
export const createLeave = async (req, res) => {
  try {
    const { employeeId, startDate, endDate, reason } = req.body;
    const leave = new Leave({ employeeId, startDate, endDate, reason });
    await leave.save();
    res.status(201).json({ message: 'Leave request created successfully', leave });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all leave requests
export const getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate('employeeId','fullName position').exec();
    console.log(leaves);
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update leave status
// Update leave status
export const updateLeaveStatus =async (req, res) => {
    const { leaveId } = req.params;
    const { status } = req.body;
  console.log(status);
    if (!['Pending', 'Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }
  
    try {
      const leave = await Leave.findByIdAndUpdate(
        leaveId,
        { status },
        { new: true }
      );
  
      if (!leave) {
        return res.status(404).json({ message: "Leave request not found." });
      }
  
      res.json({ message: "Leave status updated successfully.", leave });
    } catch (error) {
      res.status(500).json({ message: "An error occurred.", error });
    }
  };
  

// Delete a leave request
export const deleteLeave = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const leave = await Leave.findByIdAndDelete(leaveId);
    if (!leave) {
      return res.status(404).json({ message: 'Leave not found' });
    }
    res.status(200).json({ message: 'Leave deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Routes

