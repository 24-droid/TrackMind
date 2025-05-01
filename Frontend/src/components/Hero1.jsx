import React from 'react';
import Lottie from 'lottie-react';
import heroAnimation from '../assets/hero1.json';

const Hero1 = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-[#fbfaff] px-6 md:px-20 py-12">
      
      <div className="flex flex-col gap-5 md:w-1/2 text-center md:text-left">
        <p className="text-[24px] md:text-[37px] font-semibold text-[#190445CC]">
          Less Hassle,
        </p>
        <p className="text-[36px] md:text-[60px] font-extrabold text-[#190445]">
          More Interviews
        </p>
        <p className="text-[#190445] text-balance text-base md:text-lg">
          TrackMind helps you optimise your resumes and cover letters fast with AI, fill out application forms in one click, and automatically organize your job search.
        </p>
        <div>
          <button className="bg-[#6A4FEB] font-bold text-white text-sm md:text-base px-6 py-2 rounded-md hover:border-2 hover:border-white">
            Sign Up For Free
          </button>
        </div>
      </div>

      
      <div className="mt-10 md:mt-0 md:w-1/2">
        <Lottie animationData={heroAnimation} loop={true} className="w-full h-auto" />
      </div>
    </div>
  );
};

export default Hero1;
