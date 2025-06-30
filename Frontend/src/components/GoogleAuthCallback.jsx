import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

const GoogleAuthCallback = () => {
    const navigate=useNavigate();
    const location=useLocation();
    const {login}=useAuth();
    useEffect(()=>{
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const fullName = params.get('fullName');
        const email = params.get('email');
        if (token && fullName && email) {
            const userData = { fullName: decodeURIComponent(fullName), email: decodeURIComponent(email) };
            login(userData, token); 
            toast.success('Successfully logged in with Google!');
            navigate('/dashboard'); 
        }
        else{
            toast.error('Google authentication failed. Please try again.');
            navigate('/login'); 
        }
    }, [location, navigate, login]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Authenticating with Google...</h2>
        <p className="text-gray-600">Please wait, you're being redirected.</p>
      </div>
      </div>
      
  )
}

export default GoogleAuthCallback