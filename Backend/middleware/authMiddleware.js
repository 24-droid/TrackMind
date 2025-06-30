import jwt, { decode } from "jsonwebtoken"
import User from "../models/User.model.js"
export const protect=async(req,res,next)=>{
    let token;
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) { 
        res.status(401);
        throw new Error('Not authorized, no token');
    }
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET);
            const user=await User.findById(decoded.id).select('-password');
            if(!user)
                {
                    return res.status(401).json({message:"Not authorized, user not found"});
                }
            req.user=user;
            next();
        } catch (error) {
           console.error("Token verification failed:",error);
           return res.status(401).json({message:"Not authorized,token failed"}); 
        }

    }
