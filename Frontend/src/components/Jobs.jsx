import React from 'react';
import jobs from "../assets/jobs.png";
import useScrollAnimation from '../animation/useScrollAnimation'

const Jobs = () => {
  const [ref, isVisible] = useScrollAnimation();
  return (
    <div ref={ref} className={`slide-up ${isVisible ? 'slide-up-active' : ''} bg-gradient-to-br from-[#fbfaff] to-[#f4f0ff] py-20 px-6 md:px-20 flex flex-col md:flex-row items-center justify-center gap-16`}>

      
      <div className='w-full max-w-[500px] aspect-[700/570]'>
        <img
          src={jobs}
          alt="Jobs-search"
          className='w-full h-full object-cover rounded-xl shadow-lg'
        />
      </div>

     
      <div className='max-w-xl text-center md:text-left'>
        <h3 className='text-[#6A4FEB] text-sm tracking-wide uppercase mb-2'>
          Track Smarter
        </h3>
        <h2 className='text-[#190445] text-[36px] md:text-[48px] font-extrabold leading-tight mb-4'>
          Keep Your Job Search Organized
        </h2>
        <p className='text-[#190445B3] text-[18px] md:text-[20px] mb-6'>
          No more messy spreadsheets. TrackMind helps you manage all your job applications in one place – notes, dates, tasks, job descriptions, salaries, locations, and company info.
        </p>
        <button className='bg-[#6A4FEB] text-white font-semibold px-6 py-3 rounded-md hover:bg-[#5940d5] transition duration-300 shadow-md'>
          Explore Job Tracker
        </button>
      </div>
    </div>
  );
};

export default Jobs;
