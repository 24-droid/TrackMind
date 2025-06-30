import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import User from "../models/User.model.js"

export const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{
        expiresIn:"7d",
    });
}
//Now we have to write a method to register a user
// 1. Extract this info fullName, email, password, userType from req.body
// 2. Validate check if all the fields are entered.
// 3. Check if the user already exist in the database
// 4. Hash the user password
// 5. Create the User
// 6. Return token and the user info

export const signup=async(req,res)=>{
    const {fullName,email,password,userType}=req.body;
    try {
       if(!fullName||!email||!password||!userType)
        {
            return res.status(400).json({message:"All fields are required"});

        }
        const existingUser=await User.findOne({email});
        if(existingUser)
            {
                return res.status(409).json({message:"User already exists"});
            }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            fullName,
            email,
            password:hashedPassword,
            userType
        });
        const token=generateToken(user._id);
        res.status(201).json({
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                userType:user.userType,
            },
            token,
        })
    } catch (error) {
        console.error("Signing error",error);
        res.status(500).json({message:"Server error"});
    }
}
// Now we have to write a method to login a user.
//    1. Extract the email and password from req.body
//    2. Validate the details
//    3. Onbasis of that find the user
//    4. Match the user password
//    5. Return the token

export const login=async (req,res)=>{
    const {email,password}=req.body;
    try {
        if(!email || !password)
            {
                return res.status(400).json({message:"Email and password are required"});
            }
            const user = await User.findOne({ email }).select('+password');
        if(!user)
            {
               console.log("Login attempt: User not found for email:", email);
               return  res.status(401).json({message:"Invalid credentials"});
            }
            console.log("Login attempt: Found user:", user.email); 
            console.log("Login attempt: Provided password:", password); 
            console.log("Login attempt: Stored hashed password:", user.password);
            const isMatch= await bcrypt.compare(password.trim(),user.password);
        if(!isMatch)
            {   
                console.log("Login attempt: Password mismatch for user:", user.email);
                return res.status(401).json({message:"Invalid credentials"});
            }
        const token=generateToken(user._id);
        res.status(200).json({
            user:{
                id:user._id,
                fullName:user.fullName,
                email:user.email,
                userType: user.userType,
            },
            token,
        })
    } catch (error) {
        console.error("Login error",error);
        res.status(500).json({message:"Server error"});
        
    }
}
export const logout=async(req,res)=>{
    try {
       res.clearCookie("token",{
        httpOnly:true,
        secure: process.env.NODE_ENV==="production",
        sameSite:"strict",
       }) 
       return res.status(200).json({message:"Logged Out Successfully"});
    } catch (error) {
        console.error("Logout error",error);
        return res.status(500).json({message:"Server error during logout"});
    }
}