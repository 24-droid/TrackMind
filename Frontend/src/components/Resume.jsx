import React from "react";
import resume from "../assets/Resume.png";
import useScrollAnimation from '../animation/useScrollAnimation';
import { useNavigate } from "react-router-dom";

const Resume = () => {
  const [ref, isVisible] = useScrollAnimation();
  const navigate=useNavigate();
  return (
    <section
      ref={ref}
      className={`py-16 sm:py-24 bg-gradient-to-br from-white to-blue-50 ${
        isVisible ? "slide-up-active" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-16">

        {/* Image Section - This should be first for mobile */}
        {/* Removed order-2 and md:order-1 to make it default first on mobile */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="max-w-md w-full rounded-xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
            <img
              src={resume}
              alt="AI Resume Analyzer screenshot"
              className="w-full h-auto object-cover"
              loading="lazy"
            />
          </div>
        </div>

        {/* Text Section - This should be second for mobile */}
        {/* Removed order-1 and md:order-2 to make it default second on mobile */}
        {/* Added md:order-1 here to put text first on medium screens and up, matching the Jobs section's alternating layout */}
        <div className="w-full md:w-1/2 text-center md:text-left md:order-1">
          <p className="text-sm sm:text-base text-purple-600 font-semibold uppercase tracking-wide mb-2">
            AI-POWERED RESUME ANALYZER
          </p>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
            Get Your Free <span className="text-purple-700">Resume Score</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-700 mb-8 max-w-xl md:max-w-none">
            Tailoring your resume to each application significantly increases your chances of landing more interviews. Use TrackMind's AI to optimize your resume for the right skills, qualifications, and experiences with highlighted keywords and one-click AI suggestions.
          </p>
          <button className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-semibold rounded-full shadow-lg text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-300 transform hover:-translate-y-1 hover:cursor-pointer"onClick={()=>{navigate("ai-resume-analyzer")}}>
            Explore Resume Analyzer
          </button>
        </div>
      </div>
    </section>
  );
};

export default Resume;