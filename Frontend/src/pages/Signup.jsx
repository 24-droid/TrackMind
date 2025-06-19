import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import FormInput from "../components/FormInput"
import SelectInput from "../components/SelectInput"
import axios from "../api/axios"
import { toast } from "react-toastify"

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
      const res= await axios.post("/auth/signup",{
        fullName:formData.fullName,
        email:formData.email,
        password:formData.password,
        userType:formData.userType
      })
      console.log("Signup Successfull",res.data);
      toast.success("Signup successful! Please login."); 
      navigate("/login")
    } catch (error) {
      console.error(error.response?.data || "Signup failed")
      toast.error(error.response?.data?.message || "Signup failed. Please try again.");
    }finally {
      setLoading(false); 
    }
  }

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-md shadow">
      <h2 className="text-2xl font-bold mb-6">Create your TrackMind account</h2>
      <form onSubmit={handleSubmit}>
        <FormInput
          id="fullName"
          label="Full Name"
          type="text"
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          placeholder="John Doe"
        />
        <FormInput
          id="email"
          label="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          placeholder="abc@example.com"
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
        <FormInput
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder="••••••••"
        />
        <SelectInput
          id="userType"
          label="User Type"
          value={formData.userType}
          onChange={(e) => handleChange({ target: { id: "userType", value: e.target.value } })}
          error={errors.userType}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50" // <--- ADD disabled:opacity-50
          disabled={loading} 
        >
          {loading ? 'Signing Up...' : 'Sign Up'} 
        </button>
        <p className="mt-4 text-sm text-center">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  )
}
