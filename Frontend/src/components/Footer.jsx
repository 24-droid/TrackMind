import React from 'react';
import Logo from '../assets/Logo.png'; 
import { FaTwitter, FaLinkedinIn, FaGithub } from 'react-icons/fa'; 

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 text-center md:text-left">

        
        <div className="flex flex-col items-center md:items-start">
          <img src={Logo} alt="TrackMind Logo" className="w-36 md:w-40 mb-4" />
          <p className="text-gray-400 text-sm leading-relaxed">
            TrackMind helps you manage your job search like a pro – no clutter, no stress.
          </p>
        </div>

       
        <div>
          <h4 className="font-semibold text-lg text-white mb-4">Product</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Job Tracker</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Resume Analyzer</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">All Features</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="font-semibold text-lg text-white mb-4">Resources</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Help Center</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Blog</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors duration-200">Privacy Policy</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="font-semibold text-lg text-white mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li>Email: <a href="mailto:support@trackmind.ai" className="hover:text-blue-400 transition-colors duration-200">support@trackmind.ai</a></li>
          </ul>
          <div className="flex gap-5 mt-6 justify-center md:justify-start">
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <FaLinkedinIn className="w-6 h-6" />
            </a>
            <a href="#" aria-label="GitHub" className="text-gray-400 hover:text-blue-400 transition-colors duration-200">
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      
      <div className="border-t border-gray-700 mt-12 pt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TrackMind. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;