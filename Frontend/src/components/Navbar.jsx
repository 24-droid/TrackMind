import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  HiMenuAlt3,
  HiX,
  HiChevronDown,
  HiOutlineDocumentSearch,
  HiOutlineViewGrid,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineLogin,
  HiOutlineUserAdd,
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineMicrophone
} from "react-icons/hi";

const Navbar = () => {
  const [isFeaturesOpen, setIsFeaturesOpen] = useState(false); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); 
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsFeaturesOpen(false);
  };

  const NavLink = ({ to, children, icon: Icon }) => {
    const isActive = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={closeMenus}
        className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
          isActive 
            ? "bg-sky-500/10 text-sky-500 font-bold" 
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
        }`}
      >
        {Icon && <Icon className="w-5 h-5" />}
        <span>{children}</span>
      </Link>
    );
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? "py-3" : "py-6"
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`glass flex items-center justify-between px-6 py-3 transition-all duration-500 ${
          isScrolled ? "rounded-2xl bg-white/80" : "rounded-3xl bg-transparent border-transparent shadow-none"
        }`}>
          
          <Link to="/" className="flex items-center gap-3 group" onClick={closeMenus}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-500 shadow-lg shadow-sky-500/30 overflow-hidden transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3">
              <HiOutlineSparkles className="w-6 h-6 text-white absolute z-10" />
              <div className="absolute inset-0 bg-white/20 blur-md rounded-full group-hover:scale-150 transition-transform duration-500" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">
              Track<span className="text-sky-500">Mind</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                <NavLink to="/applications" icon={HiOutlineViewGrid}>Dashboard</NavLink>
                
                <div className="relative group">
                  <button
                    onClick={() => setIsFeaturesOpen(!isFeaturesOpen)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      isFeaturesOpen ? "bg-slate-100 text-slate-900 font-bold" : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <HiOutlineDocumentSearch className="w-5 h-5" />
                    <span>AI Features</span>
                    <HiChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFeaturesOpen ? "rotate-180" : ""}`} />
                  </button>
                  
                  {isFeaturesOpen && (
                    <div className="absolute top-full right-0 mt-3 w-56 glass animate-fade-in p-2 overflow-hidden border border-slate-200">
                      <Link
                        to="/ai-resume-analyzer"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-sky-50 transition-all font-medium"
                        onClick={() => setIsFeaturesOpen(false)}
                      >
                        <HiOutlineDocumentSearch className="w-5 h-5 text-sky-500" />
                        <span>Resume Analyzer</span>
                      </Link>
                      <Link
                        to="/mock-interview"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-sky-50 transition-all font-medium"
                        onClick={() => setIsFeaturesOpen(false)}
                      >
                        <HiOutlineMicrophone className="w-5 h-5 text-amber-500" />
                        <span>Mock Interview</span>
                      </Link>
                    </div>
                  )}
                </div>

                <NavLink to="/profile" icon={HiOutlineUser}>Profile</NavLink>
                
                <div className="h-6 w-[1px] bg-slate-200 mx-2" />
                
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-6 py-2 rounded-full bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white transition-all duration-300 font-bold shadow-sm"
                >
                  <HiOutlineLogout className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <NavLink to="/" icon={HiOutlineHome}>Home</NavLink>
                <div className="h-6 w-[1px] bg-slate-200 mx-4" />
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2 text-slate-600 hover:text-slate-900 transition-all font-bold"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="btn-primary flex items-center gap-2 py-2"
                >
                  <HiOutlineUserAdd className="w-5 h-5" />
                  <span>Get Started</span>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-all bg-slate-100 rounded-xl"
          >
            {isMobileMenuOpen ? <HiX className="w-6 h-6" /> : <HiMenuAlt3 className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-4 right-4 mt-2 glass border border-slate-200 p-4 animate-fade-in flex flex-col gap-2 shadow-xl shadow-slate-200/50">
          {user ? (
            <>
              <NavLink to="/applications" icon={HiOutlineViewGrid}>Dashboard</NavLink>
              <NavLink to="/ai-resume-analyzer" icon={HiOutlineDocumentSearch}>Resume Analyzer</NavLink>
              <NavLink to="/mock-interview" icon={HiOutlineMicrophone}>Mock Interview</NavLink>
              <NavLink to="/profile" icon={HiOutlineUser}>Profile</NavLink>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-3 w-full px-4 py-3 rounded-xl bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white font-bold mt-4 transition-all"
              >
                <HiOutlineLogout className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <NavLink to="/" icon={HiOutlineHome}>Home</NavLink>
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={() => { navigate("/login"); closeMenus(); }}
                  className="btn-secondary py-3 text-sm"
                >
                  Login
                </button>
                <button
                  onClick={() => { navigate("/signup"); closeMenus(); }}
                  className="btn-primary py-3 text-sm"
                >
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;