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
import passport from "passport"
import session from "express-session"
import "./config/passport-setup.js"
import { generateToken } from './controllers/authController.js';

dotenv.config()
const PORT=process.env.PORT;
const app=express();
app.use(cors({origin: [
    process.env.CLIENT_URL, 
    'http://localhost:5173' 
],credentials:true}))
app.use(express.json());
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || 'averysecretkeyforpassport', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: process.env.NODE_ENV === 'production', maxAge: 24 * 60 * 60 * 1000 } 
}));


app.use(passport.initialize());
app.use(passport.session()); 
app.get('/api/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get('/api/auth/google/callback', (req, res, next) => {
    passport.authenticate('google', (err, user, info) => {
        if (err) {
            console.error('Passport Auth Error:', err);
            return res.redirect('http://localhost:5173/login?error=auth_failed');
        }
        if (!user) {
            console.log('Passport Auth: No user found or authentication failed.');
            return res.redirect('http://localhost:5173/login?error=no_user');
        }

        req.logIn(user, (err) => {
            if (err) {
                console.error('req.logIn Error:', err);
                return res.redirect('http://localhost:5173/login?error=login_failed');
            }

            console.log('User object after req.logIn:', req.user);

            const token = generateToken(req.user._id);

            res.cookie('jwt', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production', 
                sameSite: 'Lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            console.log("Redirecting to applications");

            
            res.redirect(`http://localhost:5173/applications`); 
            
        });
    })(req, res, next);
});
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
