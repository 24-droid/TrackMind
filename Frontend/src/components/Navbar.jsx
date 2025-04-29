import React from "react";
import Logo from "../assets/Logo.png"
import { useState } from "react";
const Navbar = () => {
  const [isOpen,setIsOpen] =useState(false);
  const [isSidebar,setOpen]=useState(false);
  return (
    <nav className="bg-[#fbfaff]">
        <div className="flex justify-between">
            <div className="flex items-center justify-center gap-40">
            <img src={Logo} alt="Logo" className="w-40 h-20" />
            <div className="">
              <ul className="hidden  gap-10 font-bold text-[#190445CC] md:flex">
                <li className="hover:bg-gray-100 hover:w-max hover:h-max hover:rounded-md  hover:text-center text-[15px] ">Job Tracker</li>
                <li className="hover:bg-gray-100 hover:w-max hover:h-max hover:rounded-md hover:text-center text-[15px]">AI Resume Analyser</li>
                <li className="">
                  <button className="inline-flex justify-center text-[15px] " onClick={()=>{setIsOpen(!isOpen)}}>
                    All Features
                    <svg
                    className="-mr-1 mt-1 ml-2 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                  </svg>
                  </button>
                  {
                    isOpen&&(
                      <div className="absolute z-10 w-50 h-80 rounded-md bg-white border-2 border-gray-300">
                        <div className="py-1 text-center flex flex-col gap-2 ">
                          <p className="hover:bg-gray-100">Resume Analyser</p>
                          <p className="hover:bg-gray-100">Application Tracker</p>
                        </div>
                      </div>
                    )
                  }
                </li>
              </ul>
            </div>
            </div>
            <div className="flex items-center justify-center mr-15 ">
            <div className="hidden items-center justify-center gap-3 md:flex">
            <p className="font-bold mt-1 text-[#190445CC] hover:bg-gray-100 hover:w-max hover:h-max hover:rounded-md  hover:text-center text-[15px]">Login</p>
            <button className="bg-[#6A4FEB] font-bold text-[white] text-[12px] w-15 h-8 rounded-2xl">SignUp</button>
            </div>
            <div className="block  mt-1 md:hidden relative">
              <button className="inline-flex items-end" onClick={()=>{setOpen(!isSidebar)}}>
              <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
</svg>
              </button>
              {isSidebar&&(
                <div className="absolute z-10 w-50 h-80 right-4 rounded-md bg-white border-2 border-gray-300">
                <div className="py-1 text-center flex flex-col gap-2 justify-between">
                  <ul> 
                  <li>
                  <p className="font-bold text-[#190445CC] ">Job Tracker</p>
                  <p className="hover:bg-gray-100">Resume Analyser</p>
                  <p className="hover:bg-gray-100">Application Tracker</p>
                  </li>
                  <div className="border-t border-gray-300 mx-4" />
                  <li>
                  <p className="font-bold mt-1 text-[#190445CC]">Login</p>
                  </li>
                  <div className="border-t border-gray-300 mx-4" />
                  <li>
                  <p className="font-bold mt-1 text-[#190445CC]">Signup</p>
                  </li>
                  </ul>
                </div>
              </div>
              )}
            </div>
            </div>

        </div>
    </nav>
  )
}

export default Navbar