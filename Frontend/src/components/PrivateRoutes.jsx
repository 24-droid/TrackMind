import React from "react";
import { Outlet,Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const PrivateRoutes=()=>{
    const {user,loading}=useAuth;
    if(loading)
        {
            return <div>Loading authentication...</div>;  
        }
    return user ? <Outlet />:<Navigate to="/login" />;
}
export default PrivateRoutes;