import React from 'react';
import jobs from "../assets/jobs.png"; 
import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi';

const Jobs = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      {/* Decorative Orbs */}
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px]" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        
        <div className="w-full lg:w-1/2">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass p-2 rounded-[2rem] overflow-hidden">
              <img
                src={jobs}
                alt="Job tracking interface"
                className="w-full h-auto rounded-[1.5rem] shadow-2xl"
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-6">
            Intelligent Tracking
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6 tracking-tight">
            The Hub for Your <span className="gradient-text">Future Career</span>
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Ditch the chaotic spreadsheets. TrackMind provides a sophisticated "Command Center" for your job search—centralizing every application, deadline, and detail in one high-performance interface.
          </p>
          <button 
            className="btn-primary flex items-center gap-2 mx-auto lg:mx-0"
            onClick={() => navigate("/applications")}
          >
            Explore Dashboard <HiOutlineArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Jobs;