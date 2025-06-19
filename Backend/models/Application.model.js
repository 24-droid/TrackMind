import mongoose from "mongoose";
const applicationSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    },
    jobTitle:{
        type:String,
        required:true,
        trim:true
    },
    company:{
        type:String,
        required:true,
        trim:true,
    },
    status:{
        type:String,
        enum: ['Applied', 'Interviewing', 'Rejected', 'Offer', 'Accepted', 'Withdrawn'],
        default:'Applied',
    },
    deadline:{
        type:Date,
    },
    applicationLink:{
        type:String,
        trim:true,
    },
    notes:{
        type:String,
        trim:true,
    },
    documents:[
        {
            name:String,
            url:String,
            publicId:String,
        }
    ],
},{timestamps:true});
const Application=mongoose.model('Application',applicationSchema);
export default Application;