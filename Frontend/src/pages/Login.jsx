import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import FormInput from "../components/FormInput"

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})

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
   try {
    const res=await axios.post("/auth/login",{
      email:formData.email,
      password:formData.password
    });
    console.log("Login successfull",res.data);
    navigate("/");
   } catch (error) {
    console.error(error.response?.data || "Login failed")
    alert(error.response?.data?.message || "Login failed")
   }
  }

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
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>
        <p className="mt-4 text-sm text-center">
          Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Sign up</Link>
        </p>
      </form>
    </div>
  )
}
