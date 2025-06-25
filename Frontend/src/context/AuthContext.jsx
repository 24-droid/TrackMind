import React from "react";
import { createContext,useState,useEffect,useContext } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
const AuthContext=createContext(null);
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const[token,setToken]=useState(null);
    const [loading,setLoading]=useState(true);
    const navigate=useNavigate();
    useEffect(()=>{
        const loadUser=async()=>{
            const storedToken=localStorage.getItem('token');
            if(storedToken)
                {
                    try {
                        const response=await axios.get("/users/profile",{
                            headers:{
                                Authorization:`Bearer ${storedToken}`
                            }
                        });
                        setToken(storedToken);
                        setUser(response.data);
                        axios.defaults.headers.common['Authorization']=`Bearer ${storedToken}`;
                    } catch (error) {
                        console.error("Token Verfication Failed:",error);
                        localStorage.removeItem('token');
                        delete axios.defaults.headers.common['Authorization'];
                        setUser(null);
                        setToken(null);
                    }
                }
                setLoading(false);
        }
        loadUser();
    },[]);
    const login=async(userData,newToken)=>{
        localStorage.setItem('token', newToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        setUser(userData);
        setToken(newToken);
        navigate('/dashboard'); 
    }
    const logout=()=>{
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        setUser(null);
        setToken(null);
        navigate('/login');
    }
    return (
        <AuthContext.Provider value ={{user,token,login,logout,loading}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth=()=>useContext(AuthContext);