
import React from "react"

const SelectInput = ({ id, value, onChange, error, label }) => (
  <div className="mb-4">
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      id={id}
      value={value}
      onChange={onChange}
      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
        error ? "border-red-500 ring-red-100" : "border-gray-300 ring-blue-100"
      }`}
    >
      <option value="">Select user type</option>
      <option value="student">Student</option>
      <option value="graduate">Graduate</option>
      <option value="other">Other</option>
    </select>
    {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
  </div>
)

export default SelectInput
