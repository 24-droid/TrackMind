
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoutes = () => {
    const { user, loading } = useAuth();

    console.log("PrivateRoutes Render: user state:", user);    
    console.log("PrivateRoutes Render: loading state:", loading); 

    if (loading) {
        console.log("PrivateRoutes: Displaying 'Loading authentication...'"); 
        return <div>Loading authentication...</div>; 
    }

    if (user) {
        console.log("PrivateRoutes: User is authenticated. Rendering Outlet."); 
        return <Outlet />; 
    } else {
        console.log("PrivateRoutes: User is NOT authenticated. Redirecting to /login."); 
        return <Navigate to="/login" />; 
    }
};

export default PrivateRoutes;