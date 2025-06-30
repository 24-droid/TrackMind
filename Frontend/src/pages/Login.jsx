import React, { useState } from "react"
import { Link } from "react-router-dom"
import FormInput from "../components/FormInput"
import axios from "../api/axios"
import { useAuth } from "../context/AuthContext"
import { toast } from 'react-toastify';
export default function Login() {
  const {login}=useAuth()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})
  const [loading,setLoading]=useState(false);

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
    const res=await axios.post("/auth/login",{
      email:formData.email,
      password:formData.password.trim()
    });
    console.log("Login successfull",res.data);
    await login(res.data.user,res.data.token);
    toast.success("Login successful! Welcome.");
   } catch (error) {
    console.error(error.response?.data || "Login failed")
    toast.error(error.response?.data?.message || "Login failed. Please check your credentials.");
   }
   finally{
    setLoading(false);
   }
  }
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google';
  };


  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-md shadow">
      <h2 className="text-2xl font-bold mb-6">Login to TrackMind</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="abc@example.com"
          className="text-gray-100"
        />
        <FormInput
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          placeholder="••••••••"
        />
         <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50" // <--- ADD disabled:opacity-50
          disabled={loading} 
        >
          {loading ? 'Logging In...' : 'Login'} 
        </button>
        <div className="my-6 text-center text-gray-500">
          <span className="relative inline-block">
            <span className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300"></span>
            </span>
            <span className="relative bg-white px-3 text-sm">OR</span>
          </span>
        </div>
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 transition duration-300 text-lg font-medium"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google icon" className="w-6 h-6" />
          Sign in with Google
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  )
}
