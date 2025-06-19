import React from "react";
import { createContext,useState,useEffect,useContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
const AuthContext=createContext(null);
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
        const loadUser=async()=>{
            const token=localStorage.getItem('token');
            if(token)
                {
                    try {
                        axios.defaults.headers.common['Authorization']=`Bearer ${token}`;
                        setUser({token});
                    } catch (error) {
                        console.error("Token Verfication Failed:",error);
                        localStorage.removeItem('token');
                        delete axios.defaults.headers.common['Authorization'];
                        setUser(null);
                    }
                }
                setLoading(false);
        }
        loadUser();
    },[]);
    const login=async(userData,token)=>{
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(userData);
        navigate('/dashboard'); 
    }
    const logout=()=>{
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        navigate('/login');
    }
    return (
        <AuthContext.Provider value ={{user,login,logout,loading}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext);