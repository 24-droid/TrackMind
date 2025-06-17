
import React from "react"

const FormInput = ({ label, type, id, value, onChange, error, placeholder }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 text-gray-500 border rounded-md focus:outline-none focus:ring-2 ${
        error ? "border-red-500 ring-red-100" : "border-gray-300 ring-blue-100"
      }`}
    />
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
)

export default FormInput
