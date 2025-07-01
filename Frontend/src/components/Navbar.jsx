import React, { useState } from "react";
import Logo from "../assets/Logo.png"; 
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaBars,
  FaTimes,
  FaChevronDown,
  FaLaptopCode,
  FaFileAlt,
  FaHome,
  FaChartBar,
  FaUser,
  FaSignInAlt,
  FaUserPlus,
  FaSignOutAlt,
} from "react-icons/fa"; 

const Navbar = () => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  
  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsFeaturesOpen(false);
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        
        <Link to={user ? "/dashboard" : "/"} className="flex items-center" onClick={closeMenus}>
          <img src={Logo} alt="TrackMind Logo" className="w-28 md:w-36 lg:w-40 h-auto" />
          <span className="sr-only">TrackMind Home</span> 
        </Link>

        
        <ul className="hidden md:flex items-center space-x-8 lg:space-x-12 text-base font-medium text-gray-700">
          {user ? (
            <>
              <li>
                <Link
                  to="/applications"
                  className="hover:text-blue-600 transition duration-200"
                >
                  Dashboard
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  className="flex items-center gap-1 hover:text-blue-600 transition duration-200 focus:outline-none"
                  aria-expanded={isFeaturesOpen}
                  aria-haspopup="true"
                >
                  All Features
                  <FaChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isFeaturesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isFeaturesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white border border-gray-200 rounded-lg shadow-xl w-56 py-2 z-50 transform origin-top animate-fade-in">
                    <Link
                      to="/ai-resume-analyzer"
                      className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-gray-50 transition duration-150"
                      onClick={() => setIsFeaturesOpen(false)}
                    >
                      <FaFileAlt className="text-blue-500" /> AI Resume Analyzer
                    </Link>
                    <Link
                      to="/applications"
                      className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-gray-50 transition duration-150"
                      onClick={() => setIsFeaturesOpen(false)}
                    >
                      <FaLaptopCode className="text-green-500" /> Application Tracker
                    </Link>
                  </div>
                )}
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:text-blue-600 transition duration-200"
                >
                  Profile
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/" className="hover:text-blue-600 transition duration-200">
                  Home
                </Link>
              </li>
              <li className="relative">
                <button
                  onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                  className="flex items-center gap-1 hover:text-blue-600 transition duration-200 focus:outline-none"
                  aria-expanded={isFeaturesOpen}
                  aria-haspopup="true"
                >
                  Features
                  <FaChevronDown
                    className={`w-3 h-3 transition-transform duration-200 ${
                      isFeaturesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isFeaturesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white border border-gray-200 rounded-lg shadow-xl w-56 py-2 z-50 transform origin-top animate-fade-in">
                    
                    <p className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-gray-50 transition duration-150 cursor-not-allowed opacity-75">
                      <FaFileAlt className="text-blue-500" /> AI Resume Analyzer
                    </p>
                    <p className="flex items-center gap-2 px-4 py-3 text-gray-800 hover:bg-gray-50 transition duration-150 cursor-not-allowed opacity-75">
                      <FaLaptopCode className="text-green-500" /> Application Tracker
                    </p>
                  </div>
                )}
              </li>
            </>
          )}
        </ul>

        
        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          {user ? (
            <button
              className="px-6 py-2 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-600 transition duration-200 shadow-md hover:shadow-lg hover:cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </button>
          ) : (
            <>
              <button
                className="text-gray-700 hover:text-blue-600 transition duration-200 font-medium"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition duration-200 shadow-md hover:shadow-lg"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="focus:outline-none">
            {isMobileMenuOpen ? (
              <FaTimes className="w-7 h-7 text-gray-700" />
            ) : (
              <FaBars className="w-7 h-7 text-gray-700" />
            )}
            <span className="sr-only">Toggle mobile menu</span>
          </button>
        </div>
      </div>

      
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg py-4 px-4 z-40 animate-slide-down">
          <ul className="flex flex-col gap-4 text-gray-800 font-medium">
            {user ? (
              <>
                <li>
                  <Link
                    to="/applications"
                    onClick={closeMenus}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition duration-150"
                  >
                    <FaChartBar className="text-blue-500" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    onClick={closeMenus}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition duration-150"
                  >
                    <FaUser className="text-purple-500" /> Profile
                  </Link>
                </li>
                
                <li>
                  <button
                    onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                    className="w-full text-left flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition duration-150"
                  >
                    <FaChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isFeaturesOpen ? "rotate-180" : ""
                      }`}
                    />{" "}
                    Features
                  </button>
                  {isFeaturesOpen && (
                    <div className="ml-6 mt-2 flex flex-col gap-2 border-l border-gray-200 pl-4 animate-fade-in">
                      <Link
                        to="/ai-resume-analyzer"
                        onClick={closeMenus}
                        className="flex items-center gap-2 py-2 text-gray-700 hover:text-blue-600 transition duration-150"
                      >
                        <FaFileAlt className="text-blue-500" /> AI Resume Analyzer
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={closeMenus}
                        className="flex items-center gap-2 py-2 text-gray-700 hover:text-green-600 transition duration-150"
                      >
                        <FaLaptopCode className="text-green-500" /> Application Tracker
                      </Link>
                    </div>
                  )}
                </li>

                <li className="border-t border-gray-100 pt-4 mt-4">
                  <button
                    className="w-full flex items-center justify-center gap-2 bg-red-500 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition duration-200 shadow-md"
                    onClick={() => {
                      handleLogout();
                      closeMenus();
                    }}
                  >
                    <FaSignOutAlt /> Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    to="/"
                    onClick={closeMenus}
                    className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition duration-150"
                  >
                    <FaHome className="text-blue-500" /> Home
                  </Link>
                </li>
                
                <li>
                  <button
                    onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                    className="w-full text-left flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-gray-100 transition duration-150"
                  >
                    <FaChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isFeaturesOpen ? "rotate-180" : ""
                      }`}
                    />{" "}
                    Features
                  </button>
                  {isFeaturesOpen && (
                    <div className="ml-6 mt-2 flex flex-col gap-2 border-l border-gray-200 pl-4 animate-fade-in">
                      <p className="flex items-center gap-2 py-2 text-gray-700 opacity-75 cursor-not-allowed">
                        <FaFileAlt className="text-blue-500" /> AI Resume Analyzer
                      </p>
                      <p className="flex items-center gap-2 py-2 text-gray-700 opacity-75 cursor-not-allowed">
                        <FaLaptopCode className="text-green-500" /> Application Tracker
                      </p>
                    </div>
                  )}
                </li>

                <div className="border-t border-gray-100 pt-4 mt-4 flex flex-col gap-3">
                  <li>
                    <button
                      className="w-full flex items-center justify-center gap-2 text-gray-700 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition duration-200"
                      onClick={() => {
                        navigate("/login");
                        closeMenus();
                      }}
                    >
                      <FaSignInAlt /> Login
                    </button>
                  </li>
                  <li>
                    <button
                      className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition duration-200 shadow-md"
                      onClick={() => {
                        navigate("/signup");
                        closeMenus();
                      }}
                    >
                      <FaUserPlus /> Sign Up
                    </button>
                  </li>
                </div>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;