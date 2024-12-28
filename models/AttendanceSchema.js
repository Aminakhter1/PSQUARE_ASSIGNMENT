
import mongoose from "mongoose";
const attendanceSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  
  date: { type: Date, required: true },
  task: { type: String,default:"No task is assigned" },
  status: { type: String, enum: ['Present', 'Absent','Medical Leave','Work From Home' ], default: 'Absent' },
});

export default mongoose.model('Attendance', attendanceSchema);