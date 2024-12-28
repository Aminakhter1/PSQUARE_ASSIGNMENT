import express from "express";
import {fileURLToPath} from 'url';
import connectDB from "./db.js";
import bodyParser from "body-parser";
import cors from "cors";
import fileUpload from "express-fileupload";
import path from "path";
import canrouter from "./routes/candidateRoutes.js";
import employeerouter from "./routes/employeeRoutes.js";
import attendanceRouter from "./routes/attendaceRoutes.js";
import resumerouter from "./routes/resumeRoutes.js";
import authrouter from "./routes/authRoutes.js";
import leaveRouter from "./routes/leaveRoutes.js";
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);
connectDB();
const app=express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

app.use(fileUpload()); 
app.use(express.static(path.join(__dirname, "./frontend/build")));
//routes
// Route for candidates
app.use('/api/auth', authrouter);
app.use('/api/candidates', canrouter);
app.use('/api/employees', employeerouter); // Mount the candidate routes
app.use('/api/attendance',attendanceRouter);
app.use("/api", leaveRouter);
app.use("/api", resumerouter);
app.use("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
  });
  
const PORT=8080;
app.listen(PORT,()=>{
    console.log("App is Working");

})