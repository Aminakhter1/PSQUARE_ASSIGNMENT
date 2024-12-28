import mongoose from "mongoose";
const candidateSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  department: { type: String, required: true },
  experience: { type: String, required: true },
  resume: { data: Buffer,contentType:String }, // URL or file path to the uploaded resume
  status: { type: String, enum: ['New', 'Scheduled', 'Selected', 'Rejected'], default: 'New' },
  createdAt: { type: Date, default: Date.now },
  });
  
  
  export default mongoose.model('Candidate', candidateSchema);