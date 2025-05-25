import React from 'react';
import Logo from '../assets/Logo.png';

const Footer = () => {
  return (
    <footer className="bg-[#f4f0ff] text-[#190445] py-12 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1  md:grid-cols-4 gap-10 text-center md:text-left">
        
        <div className='flex flex-col items-center md:items-start'>
          <img src={Logo} alt="Logo" className="w-32 mb-4" />
          <p className="text-[#190445B3] text-sm">
            TrackMind helps you manage your job search like a pro – no clutter, no stress.
          </p>
        </div>

        
        <div>
          <h4 className="font-semibold text-lg mb-3">Product</h4>
          <ul className="space-y-2 text-sm text-[#190445B3]">
            <li><a href="#" className="hover:text-[#6A4FEB] transition">Job Tracker</a></li>
            <li><a href="#" className="hover:text-[#6A4FEB] transition">Resume Analyzer</a></li>
            <li><a href="#" className="hover:text-[#6A4FEB] transition">All Features</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="font-semibold text-lg mb-3">Resources</h4>
          <ul className="space-y-2 text-sm text-[#190445B3]">
            <li><a href="#" className="hover:text-[#6A4FEB] transition">Help Center</a></li>
            <li><a href="#" className="hover:text-[#6A4FEB] transition">Blog</a></li>
            <li><a href="#" className="hover:text-[#6A4FEB] transition">Privacy Policy</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="font-semibold text-lg mb-3">Contact</h4>
          <ul className="space-y-2 text-sm text-[#190445B3]">
            <li>Email: support@trackmind.ai</li>
          </ul>
          <div className="flex gap-4 mt-4 justify-center md:justify-start">
            
            <a href="#" className="hover:text-[#6A4FEB] transition ">Twitter</a>
            <a href="#" className="hover:text-[#6A4FEB] transition ">LinkedIn</a>
            <a href="#" className="hover:text-[#6A4FEB] transition ">GitHub</a>
          </div>
        </div>
      </div>

     
      <div className="border-t border-gray-300 mt-10 pt-6 text-center text-sm text-[#19044599]">
        © {new Date().getFullYear()} TrackMind. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
