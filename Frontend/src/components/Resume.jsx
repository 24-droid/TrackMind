import React from "react";
import resume from "../assets/Resume.png";
import { useNavigate } from "react-router-dom";
import { HiOutlineSparkles } from 'react-icons/hi';

const Resume = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Orb */}
      <div className="absolute bottom-1/2 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">

        <div className="w-full lg:w-1/2 lg:order-2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass p-2 rounded-[2rem] overflow-hidden">
              <img
                src={resume}
                alt="AI Resume analysis"
                className="w-full h-auto rounded-[1.5rem] shadow-2xl"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-6">
            AI Resume Analyzer
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
            Elevate Your <span className="text-purple-400">Professional Identity</span>
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Don't leave your first impression to chance. Our AI analyzer breaks down your resume against specific job roles, identifying keyword gaps and providing actionable feedback to make you the top candidate.
          </p>
          <button 
            className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-slate-900 font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/20 flex items-center gap-2 mx-auto lg:mx-0"
            onClick={() => navigate("/ai-resume-analyzer")}
          >
            Start Analyzing <HiOutlineSparkles className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Resume;