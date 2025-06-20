import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import applicationRoutes from "./routes/applicationRoutes.js"
import userRoutes from "./routes/userRoutes.js"

dotenv.config()
const PORT=process.env.PORT;
const app=express();
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/applications", applicationRoutes);
app.use('/api/users', userRoutes);
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log(`Database connected successfully`);
}).catch((error)=>{
    console.error("Mongodb connection error",err);
})
app.listen(PORT, () => {
    console.log(`Server is on http://localhost:${PORT}`);
  });
