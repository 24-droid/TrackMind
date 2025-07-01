import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema=new mongoose.Schema({
    fullName:{
        type:String,
        required:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    password:{
        type:String,
        required: function() { return !this.googleId; },
        minlength: [6, 'Password must be at least 6 characters long'],
        select: false,
    },
    googleId:{
        type:String,
        unique:true,
        sparse:true,
    },
    avatar:{
        type:String,
    },
    userType:{
        type:String,
        enum:["student","graduate","other"],
        default: 'student', 
        required:true
    },
    emailNotificationsEnabled:{
        type:Boolean,
        default:true,
    },
    reminderDaysBefore:{
        type:Number,
        default:3,
        min:0,
    },
    lastReminderSentAt:{
        type:Date,
        default:null,
    }
},{timestamps:true})
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
  };

export default mongoose.model("User",userSchema)