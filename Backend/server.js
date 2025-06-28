import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import applicationRoutes from "./routes/applicationRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"
import resumeRoutes from "./routes/resumeRoutes.js"
import startReminderJob from "./cronJobs/reminderJob.js"

dotenv.config()
const PORT=process.env.PORT;
const app=express();
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/applications", applicationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/resume',resumeRoutes);
startReminderJob();
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log(`Database connected successfully`);
}).catch((error)=>{
    console.error("Mongodb connection error",error);
})
app.listen(PORT, () => {
    console.log(`Server is on http://localhost:${PORT}`);
  });
