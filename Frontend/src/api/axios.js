import axios from "axios"
console.log("VITE_API_BASE_URL from .env:", import.meta.env.VITE_API_BASE_URL);
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, 
})

export default instance
