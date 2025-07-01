import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import heroAnimation from '../assets/hero1.json';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';

const Hero1 = () => {
  const navigate=useNavigate();
  const {user}=useAuth();
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white to-blue-50 px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-12">

        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col gap-4 text-center md:text-left md:w-1/2"
        >
          <p className="text-sm sm:text-base text-blue-600 font-semibold uppercase tracking-wide">
            AI-POWERED JOB APPLICATION
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
            Less Hassle, <br className="hidden md:inline"/> <span className="text-blue-700">More Interviews</span>
          </h1>
          <p className="text-base sm:text-lg text-gray-700 mt-2 max-w-xl md:max-w-none">
            TrackMind helps you optimize your resumes and cover letters fast with AI, fill out application forms in one click, and automatically organize your job search.
          </p>
          <div className="mt-6">
            {user ?(
            <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 transform hover:-translate-y-1 hover:cursor-pointer" onClick={()=>{navigate("applications")}}>
              View My Deadlines
            </button>
            ):(
              <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 transform hover:-translate-y-1 hover:cursor-pointer" onClick={()=>{navigate("signup")}}>
              Sign Up For Free
            </button>
            )
              }
          </div>
        </motion.div>

        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="mt-12 md:mt-0 md:w-1/2 flex justify-center"
        >
          <div className="max-w-md w-full"> 
            <Lottie animationData={heroAnimation} loop={true} className="w-full h-auto" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero1;