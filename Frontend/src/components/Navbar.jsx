import React, { useState } from "react";
import Logo from "../assets/Logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSidebar, setSidebar] = useState(false);

  return (
    <nav className="bg-[#fbfaff] shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        
        
        <div className="flex items-center gap-16">
          <img src={Logo} alt="Logo" className="w-32 md:w-40" />
          
          
          <ul className="hidden md:flex items-center gap-10 font-medium text-[#190445CC]">
            <li className="hover:text-[#6A4FEB] transition">Job Tracker</li>
            <li className="hover:text-[#6A4FEB] transition">AI Resume Analyser</li>
            <li className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 hover:text-[#6A4FEB] transition"
              >
                All Features
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isOpen && (
                <div className="absolute top-10 left-0 bg-white border border-gray-200 rounded-md shadow-lg w-48 py-2 z-50">
                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Resume Analyser</p>
                  <p className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Application Tracker</p>
                </div>
              )}
            </li>
          </ul>
        </div>

        
        <div className="hidden md:flex items-center gap-4">
          <button className="text-[#190445CC] hover:text-[#6A4FEB] transition font-medium">Login</button>
          <button className="bg-[#6A4FEB] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#5a40d8] transition">
            Sign Up
          </button>
        </div>

        
        <div className="md:hidden">
          <button onClick={() => setSidebar(!isSidebar)}>
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      
      {isSidebar && (
        <div className="md:hidden absolute top-16 right-4 w-60 bg-white rounded-md shadow-lg border border-gray-200 z-50 py-4 px-6">
          <ul className="flex flex-col gap-4 text-[#190445CC] font-medium">
            <li className="hover:text-[#6A4FEB] transition">Job Tracker</li>
            <li className="hover:text-[#6A4FEB] transition">Resume Analyser</li>
            <li className="hover:text-[#6A4FEB] transition">Application Tracker</li>
            <div className="border-t pt-4">
              <li className="hover:text-[#6A4FEB] transition">Login</li>
              <li>
                <button className="mt-2 w-full bg-[#6A4FEB] text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-[#5a40d8] transition">
                  Sign Up
                </button>
              </li>
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
