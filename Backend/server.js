import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cookieParser from "cookie-parser"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"

dotenv.config()
const app=express();
const PORT=process.env.PORT;
app.use(cors({origin:process.env.CLIENT_URL,credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log(`Server running on http://localhost:${process.env.PORT} `)
})
app.listen(PORT, () => {
    console.log(`Server is on http://localhost:${PORT}`);
  });
