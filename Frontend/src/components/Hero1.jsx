import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import heroAnimation from '../assets/hero1.json';

const Hero1 = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-[#fbfaff] to-[#f4f0ff] px-6 md:px-20 py-16 overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col gap-5 md:w-1/2 text-center md:text-left"
      >
        <p className="text-sm text-[#6A4FEB] uppercase tracking-wider">
          AI-powered job application
        </p>
        <p className="text-[28px] md:text-[38px] font-semibold text-[#190445CC]">
          Less Hassle,
        </p>
        <p className="text-[36px] md:text-[60px] font-extrabold text-[#190445] leading-tight">
          More Interviews
        </p>
        <p className="text-[#190445] text-balance text-base md:text-lg mt-2 md:mt-4">
          TrackMind helps you optimise your resumes and cover letters fast with AI, fill out application forms in one click, and automatically organize your job search.
        </p>
        <div className="mt-4">
          <button className="bg-[#6A4FEB] font-bold text-white text-sm md:text-base px-7 py-3 rounded-md hover:bg-[#5a40d8] transition-all duration-300 shadow-md">
            Sign Up For Free
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="mt-12 md:mt-0 md:w-1/2 flex justify-center"
      >
        <div className="max-w-[500px] w-full">
          <Lottie animationData={heroAnimation} loop={true} />
        </div>
      </motion.div>
    </div>
  );
};

export default Hero1;
