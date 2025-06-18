import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userType:{
        type:String,
        enum:["student","graduate","other"],
        required:true
    }
},{timestamps:true})

export default mongoose.model("User",userSchema)