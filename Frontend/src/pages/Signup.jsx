import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "../api/axios"
import { toast } from "react-toastify"
import { HiOutlineUser, HiOutlineMail, HiOutlineLockClosed, HiOutlineIdentification, HiArrowRight } from 'react-icons/hi'

export default function Signup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    userType: ""
  })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.id]: "" }))
  }

  const validate = () => {
    const err = {}
    if (!formData.fullName) err.fullName = "Full name is required"
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) err.email = "Enter a valid email"
    if (!formData.password || formData.password.length < 8)
      err.password = "Password must be at least 8 characters"
    if (formData.password !== formData.confirmPassword)
      err.confirmPassword = "Passwords do not match"
    if (!formData.userType) err.userType = "Please select a user type"
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!validate()) return;
    setLoading(true);
    try {
      const res = await axios.post("/auth/signup",{
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        userType: formData.userType
      })
      console.log("Signup Successful", res.data);
      toast.success("Signup successful! Please login."); 
      navigate("/login")
    } catch (error) {
      console.error(error.response?.data || "Signup failed")
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false); 
    }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}auth/google`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden py-20">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-xl animate-fade-in">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Create Account</h2>
          <p className="text-slate-600">Join TrackMind and accelerate your career</p>
        </div>

        <div className="glass p-8 md:p-10 rounded-[2.5rem]">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            <div className="relative">
              <HiOutlineUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
              <input
                id="fullName"
                type="text"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 bg-white/70 border ${errors.fullName ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:border-purple-500 text-slate-900 transition-all`}
              />
              {errors.fullName && <p className="text-rose-500 text-xs mt-1 ml-2">{errors.fullName}</p>}
            </div>

            <div className="relative">
              <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
              <input
                id="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 bg-white/70 border ${errors.email ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:border-purple-500 text-slate-900 transition-all`}
              />
              {errors.email && <p className="text-rose-500 text-xs mt-1 ml-2">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-white/70 border ${errors.password ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:border-purple-500 text-slate-900 transition-all`}
                />
                {errors.password && <p className="text-rose-500 text-xs mt-1 ml-2">{errors.password}</p>}
              </div>

              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 bg-white/70 border ${errors.confirmPassword ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:border-purple-500 text-slate-900 transition-all`}
                />
                {errors.confirmPassword && <p className="text-rose-500 text-xs mt-1 ml-2">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="relative">
              <HiOutlineIdentification className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
              <select
                id="userType"
                value={formData.userType}
                onChange={handleChange}
                className={`w-full pl-12 pr-4 py-3 bg-white/70 border ${errors.userType ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:border-purple-500 text-slate-900 appearance-none transition-all`}
              >
                <option value="" disabled className="bg-white">I am a...</option>
                <option value="student" className="bg-white">Student</option>
                <option value="professional" className="bg-white">Professional</option>
                <option value="recruiter" className="bg-white">Recruiter</option>
              </select>
              {errors.userType && <p className="text-rose-500 text-xs mt-1 ml-2">{errors.userType}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2 group mt-4 bg-purple-600 hover:bg-purple-700 shadow-purple-500/20"
            >
              {loading ? 'Creating Account...' : 'Sign Up'} 
              {!loading && <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white/70 px-4 text-slate-600">Or join with</span></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-slate-200 rounded-2xl text-slate-900 bg-white/70 hover:bg-slate-100 transition duration-300 font-semibold"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
              Continue with Google
            </button>

            <p className="text-center text-slate-600 text-sm mt-8">
              Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300 font-bold ml-1">Sign in</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

