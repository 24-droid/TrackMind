import React from 'react';
import Lottie from 'lottie-react';
import { motion } from 'framer-motion';
import heroAnimation from '../assets/hero1.json';
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext';
import { HiArrowRight } from 'react-icons/hi';

const Hero1 = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-slate-50">
      {/* Background Orbs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-700" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-6 text-center lg:text-left lg:w-3/5"
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 self-center lg:self-start px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-sm font-semibold uppercase tracking-wider"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              AI-Powered Career Hub
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
              Master Your <br />
              <span className="gradient-text">Job Search Journey</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              TrackMind automates the tedious parts of applying. From AI resume optimization and <span className="font-bold text-sky-500">Live Video Mock Interviews</span> to intelligent tracking, we give you the edge to land your dream role.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mt-4">
              {user ? (
                <button 
                  className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center" 
                  onClick={() => navigate("/applications")}
                >
                  Dashboard <HiArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <>
                  <button 
                    className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center" 
                    onClick={() => navigate("/signup")}
                  >
                    Get Started Free <HiArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    className="btn-secondary w-full sm:w-auto" 
                    onClick={() => navigate("/login")}
                  >
                    View Demo
                  </button>
                </>
              )}
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-8 opacity-50 grayscale hover:grayscale-0 transition-all">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-slate-900">10k+</span>
                <span className="text-xs text-slate-600 uppercase tracking-widest">Resumes Analyzed</span>
              </div>
              <div className="h-10 w-[1px] bg-slate-300" />
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-2xl font-bold text-slate-900">24/7</span>
                <span className="text-xs text-slate-600 uppercase tracking-widest">AI Interviews</span>
              </div>
              <div className="h-10 w-[1px] bg-slate-300 hidden sm:block" />
              <div className="flex flex-col items-center lg:items-start hidden sm:flex">
                <span className="text-2xl font-bold text-slate-900">98%</span>
                <span className="text-xs text-slate-600 uppercase tracking-widest">Success Rate</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "circOut" }}
            className="lg:w-2/5 relative"
          >
            <div className="relative z-10 glass p-4 rounded-[2rem] bg-gradient-to-tr from-white/5 to-transparent">
              <Lottie animationData={heroAnimation} loop={true} className="w-full h-auto drop-shadow-2xl" />
            </div>
            {/* Decorative element */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-indigo-500/20 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero1;