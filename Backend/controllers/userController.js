import User from "../models/User.model.js"
import { generateToken } from "./authController.js"
const getUserProfile= async(req,res)=>{
    const user= await User.findById(req.user._id).select("-password");
    if(user)
        {
            res.json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
            });
        }
   else
    {
        res.status(404).json({message:"User not found"});
    }

}
const updatedUserProfile=async(req,res)=>{
    const user=await User.findById(req.user._id);
    if(user){
        user.fullName=req.body.fullName||user.fullName;
        user.email=req.body.email||user.email;
        if(req.body.password)
            {
                if(req.body.password.length<6)
                    {
                        res.status(400).json({message:"Password must be atleast 6 characters long"});
                    }
                user.password=req.body.password;
            }
        const updatedUser=await user.save();
        res.json({
            _id:updatedUser._id,
            fullName:updatedUser.fullName,
            email:updatedUser.email,
            token:generateToken(updatedUser._id)
        })
        
    }
    else{
        res.status(404).json({message:"User not found"});
    }
}
export {getUserProfile,updatedUserProfile}