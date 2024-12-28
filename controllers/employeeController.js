import Employee from "../models/employeeSchema.js"; // Import the Employee model

// Create a new employee
export const createEmployee = async (req, res) => {
  try {
    // Extract the necessary fields from the request body
    const { fullName, email, phoneNumber, position, department, dateOfJoining } = req.body;

    // Validate required fields
    if (!fullName || !email || !phoneNumber || !position || !department || !dateOfJoining) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Create a new employee document
    const newEmployee = new Employee({
      fullName,
      email,
      phoneNumber,
      position,
      department,
      dateOfJoining,
    });

    // Save the employee to the database
    await newEmployee.save();

    // Send a success response
    return res.status(200).json({ success: true, message: "Employee added successfully." });
  } catch (error) {
    console.error("Error while adding employee:", error);
    return res.status(500).json({ success: false, message: "Error saving employee to the database." });
  }
};

// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, data: employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({ success: false, message: "Error fetching employees." });
  }
};

// Update employee details
export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedEmployee = await Employee.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedEmployee) {
      return res.status(404).json({ success: false, message: "Employee not found." });
    }

    res.status(200).json({ success: true, data: updatedEmployee });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({ success: false, message: "Error updating employee." });
  }
};

// Delete an employee

// Example delete employee function
export const deleteEmployee = async (req,res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return { message: 'Employee not found' };
    }

    // Delete the employee (this will also trigger the pre-delete hook to delete attendance)
    await employee.deleteOne();

    return { message: 'Employee and their attendance records deleted successfully' };
  } catch (error) {
    console.error('Error deleting employee:', error);
    return { message: 'Error deleting employee' };
  }
};
