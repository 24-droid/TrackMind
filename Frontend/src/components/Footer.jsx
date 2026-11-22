import React from 'react';
import { FaTwitter, FaLinkedinIn, FaGithub, FaDiscord } from 'react-icons/fa'; 
import { HiOutlineSparkles } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="bg-slate-50 text-slate-300 py-20 px-4 md:px-6 border-t border-slate-900">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        
        <div className="flex flex-col items-center md:items-start space-y-6">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg shadow-sky-500/30 overflow-hidden transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <HiOutlineSparkles className="w-6 h-6 text-white absolute z-10" />
              <div className="absolute inset-0 bg-white/20 blur-md rounded-full group-hover:scale-150 transition-transform duration-500" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              Track<span className="text-sky-500">Mind</span>
            </span>
          </div>
          <p className="text-slate-600 text-sm leading-relaxed max-w-xs text-center md:text-left">
            Revolutionizing the job search with AI-powered tools designed to land you the role you deserve.
          </p>
          <div className="flex gap-4">
            {[FaTwitter, FaLinkedinIn, FaGithub, FaDiscord].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="p-2 glass rounded-lg text-slate-600 hover:text-sky-400 hover:border-sky-500/50 transition-all duration-300"
              >
                <Icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:col-span-3 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Platform</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-slate-600 hover:text-sky-400 transition-colors">AI Tracker</a></li>
              <li><a href="#" className="text-slate-600 hover:text-sky-400 transition-colors">Resume Analyzer</a></li>
              <li><a href="#" className="text-slate-600 hover:text-sky-400 transition-colors">Privacy Shield</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Resources</h4>
            <ul className="space-y-4 text-sm font-medium">
              <li><a href="#" className="text-slate-600 hover:text-sky-400 transition-colors">Documentation</a></li>
              <li><a href="#" className="text-slate-600 hover:text-sky-400 transition-colors">Career Blog</a></li>
              <li><a href="#" className="text-slate-600 hover:text-sky-400 transition-colors">Help Center</a></li>
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start col-span-2 md:col-span-1">
            <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-widest text-xs">Newsletter</h4>
            <p className="text-slate-600 text-sm mb-4 text-center md:text-left">Get the latest career tips and AI updates.</p>
            <div className="flex w-full max-w-sm">
              <input 
                type="email" 
                placeholder="email@example.com" 
                className="w-full px-4 py-2 rounded-l-lg bg-white border border-slate-200 focus:outline-none focus:border-sky-500 transition-all"
              />
              <button className="px-4 py-2 bg-sky-500 text-slate-900 font-bold rounded-r-lg hover:bg-sky-600 transition-all">
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-900 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-medium text-slate-600">
        <p>© {new Date().getFullYear()} TrackMind AI. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900 transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;