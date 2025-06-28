import User from "../models/User.model.js"
import { generateToken } from "./authController.js"
const getUserProfile= async(req,res)=>{
    const user= await User.findById(req.user._id).select("fullName email emailNotificationsEnabled reminderDaysBefore");
    if(user)
        {
            res.json({
                _id:user._id,
                fullName:user.fullName,
                email:user.email,
                emailNotificationsEnabled: user.emailNotificationsEnabled,
                reminderDaysBefore: user.reminderDaysBefore,
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
const getUserNotificationPreferences=async(req,res)=>{
    try {
        const user=await User.findById(req.user._id).select("emailNotificationsEnabled reminderDaysBefore");
        if(!user)
            {
                return res.status(404).json({message:"User not found."});
            }
        res.status(200).json({
            emailNotificationsEnabled:user.emailNotificationsEnabled,
            reminderDaysBefore:user.reminderDaysBefore,
        });
    } catch (error) {
        console.error("Error fetching notifications preferences",error);
        res.status(500).json({message:"Server error while fetching preferences"});
    }
}
const updateUserNotificationPreferences=async(req,res)=>{
    const { emailNotificationsEnabled, reminderDaysBefore } = req.body;
    try {
        const user=await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        
        if (typeof emailNotificationsEnabled !== 'boolean') {
            return res.status(400).json({ message: 'emailNotificationsEnabled must be a boolean.' });
        }
        if (typeof reminderDaysBefore !== 'number' || reminderDaysBefore < 0) {
            return res.status(400).json({ message: 'reminderDaysBefore must be a non-negative number.' });
        }
        user.emailNotificationsEnabled=emailNotificationsEnabled;
        user.reminderDaysBefore=reminderDaysBefore;
        await user.save();
        res.status(200).json({message:"Notification preferences updated successfully."});

    } catch (error) {
        console.error("Error updating notifications preferences:",error);
        res.status(500).json({message:"Server error while updating preferences."});
    }
}
export {getUserProfile,updatedUserProfile,getUserNotificationPreferences,updateUserNotificationPreferences}