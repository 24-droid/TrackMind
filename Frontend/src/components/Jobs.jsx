import React from 'react';
import jobs from "../assets/jobs.png"; 
import useScrollAnimation from '../animation/useScrollAnimation'; 
import { useNavigate } from 'react-router-dom';

const Jobs = () => {
  const [ref, isVisible] = useScrollAnimation();
  const navigate=useNavigate();
  return (
    <section ref={ref} className={`py-16 sm:py-24 bg-gradient-to-br from-white to-blue-50 ${isVisible ? 'slide-up-active' : ''}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16">

        
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="max-w-md w-full rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
            <img
              src={jobs}
              alt="Job search dashboard screenshot"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        
        <div className="w-full md:w-1/2 text-center md:text-left">
          <p className="text-sm sm:text-base text-blue-600 font-semibold uppercase tracking-wide mb-2">
            TRACK SMARTER
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Keep Your Job Search <span className="text-blue-700">Organized</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-xl md:max-w-none">
            No more messy spreadsheets. TrackMind helps you manage all your job applications in one place – notes, dates, tasks, job descriptions, salaries, locations, and company info.
          </p>
          <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-full shadow-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-300 transform hover:-translate-y-1 hover:cursor-pointer"onClick={()=>{navigate("dashboard")}}>
            Explore Job Tracker
          </button>
        </div>
      </div>
    </section>
  );
};

export default Jobs;