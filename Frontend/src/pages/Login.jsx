import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import FormInput from "../components/FormInput"
import axios from "../api/axios"
import { useAuth } from "../context/AuthContext"
import { toast } from 'react-toastify';
import { HiOutlineArrowRight, HiOutlineMail, HiOutlineLockClosed } from 'react-icons/hi';

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.id]: "" }))
  }

  const validate = () => {
    const err = {}
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) err.email = "Enter a valid email"
    if (!formData.password || formData.password.length < 6) err.password = "Minimum 6 characters required"
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true);
   try {
    const res = await axios.post("/auth/login",{
      email: formData.email,
      password: formData.password.trim()
    });
    console.log("Login successful", res.data);
    await login(res.data.user, res.data.token);
    toast.success("Login successful! Welcome back.");
   } catch (error) {
    console.error(error.response?.data || "Login failed")
    toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
   }
   finally{
    setLoading(false);
   }
  }

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}auth/google`;
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10" />

      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-2 tracking-tight">Welcome Back</h2>
          <p className="text-slate-600">Continue your journey with TrackMind</p>
        </div>

        <div className="glass p-8 md:p-10 rounded-[2.5rem]">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <HiOutlineMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3.5 bg-white/70 border ${errors.email ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:border-sky-500 text-slate-900 transition-all`}
                />
                {errors.email && <p className="text-rose-500 text-xs mt-1 ml-2">{errors.email}</p>}
              </div>

              <div className="relative">
                <HiOutlineLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 w-5 h-5" />
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3.5 bg-white/70 border ${errors.password ? 'border-rose-500' : 'border-slate-200'} rounded-2xl focus:outline-none focus:border-sky-500 text-slate-900 transition-all`}
                />
                {errors.password && <p className="text-rose-500 text-xs mt-1 ml-2">{errors.password}</p>}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-4 text-lg font-bold flex items-center justify-center gap-2 group"
            >
              {loading ? 'Authenticating...' : 'Sign In'} 
              {!loading && <HiOutlineArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-white/70 px-4 text-slate-600">Or continue with</span></div>
            </div>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 px-4 py-4 border border-slate-200 rounded-2xl text-slate-900 bg-white/70 hover:bg-slate-100 transition duration-300 font-semibold"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
              Sign in with Google
            </button>

            <p className="text-center text-slate-600 text-sm mt-8">
              New here? <Link to="/signup" className="text-sky-400 hover:text-sky-300 font-bold ml-1">Create an account</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

