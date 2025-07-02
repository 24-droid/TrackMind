import React from "react";
import { createContext,useState,useEffect,useContext } from "react";
import axios from "../api/axios";
import { useNavigate,useLocation } from "react-router-dom";
import {toast} from "react-toastify"
const AuthContext=createContext(null);
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();
    const location = useLocation();
    useEffect(() => {
        const loadUser = async () => {
            setLoading(true); 
            try {
                const response=await axios.get("users/me");
                console.log("AuthContext: API /users/me successful. Response data:", response.data);
                if (response.status === 200 && response.data) {
                    setUser(response.data); 
                } else if (response.status === 304) {
                    console.log("AuthContext: /users/me returned 304 Not Modified. Assuming user data is present/cached.");
                }
            } catch (error) {
                console.error("User verification failed via cookie:", error.response?.data?.message || error.message);
                setUser(null);
            } finally{
                setLoading(false); 
                console.log("AuthContext: loadUser finished. Setting loading to false.");
            }
            
        };
        loadUser();
    }, []);
    const login = (userData) => { 
        setUser(userData); 
        setLoading(false); 
        navigate('/applications');
    };
    const logout = async () => {
        try {
            await axios.post('/users/logout');
            toast.info('Logged out successfully!');
        } catch (error) {
            console.error('Logout API call failed:', error.response?.data?.message || error.message);
            toast.error('Logout failed on server. Please try again.');
        } finally {
            setUser(null); 
            setLoading(false); 
            navigate('/login'); 
        }
    };
    const value = { user, token, login, logout, loading, setUser };
    return (
        <AuthContext.Provider value ={value}>
            {loading ? (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-75 z-50">
                    <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    <p className="ml-3 text-gray-700">Checking authentication...</p>
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext);