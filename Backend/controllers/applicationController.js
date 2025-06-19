import Application from "../models/Application.model.js";
import mongoose from "mongoose";
//Write a controller to create an application
// 1.Extract the following info from jobTitle, company, status, deadline, applicationLink, notes from req.body
// 2.If the required fields aren't present throw an error
// 3.If everything is perfect then we are set to create an application

export const createApplication=async(req,res)=>{
    const {jobTitle, company, status, deadline, applicationLink, notes}=req.body;
    if(!jobTitle || !company)
        {
            return res.status(400).json({message:'Job title and company are required'});
        }
    try {
        const newApplication=await Application.create({
            userId:req.user._id,
            jobTitle,
            company,
            status,
            deadline,
            applicationLink,
            notes,
        })
        res.status(201).json(newApplication);
    } catch (error) {
        console.error("Error creating application:",error);
        res.status(500).json({message:"Server error creating application"});
    }
}
export const getApplications=async(req,res)=>{
    try {
        const applications=await Application.find({userId:req.user._id}).sort({createdAt:-1});
        res.status(200).json(applications);
    } catch (error) {
        console.error("Error fetching applications:",error);
        res.status(500).json({message:"Server error fetching applications"});
    }
}
export const getApplicationById=async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        {
            return res.status(400).json({message:"Invalid application ID"});
        }
    try {
        const application=await Application.findOne({_id:req.params.id,userId:req.user._id});
        if(!application){
            return res.status(404).json({message:"Application not found"});
        }
        res.status(200).json(application);
    } catch (error) {
        console.error("Error fetching application by ID:",error);
        res.status(500).json({message:"Server error fetching application"});
    }
}
export const updateApplication=async(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        {
            return res.status(400).json({message:"Invalid application ID"});
        }
    try {
        const application = await Application.findOne({ _id: req.params.id, userId: req.user._id });
        if(!application)
            {
                return res.status(404).json({message:"Application not found"});
            }
        const updatedApplication=await Application.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true,runValidators:true}
        )
        res.status(200).json(updatedApplication);
    } catch (error) {
        console.error("Error updating application",error);
        res.status(500).json({message:"Server error updating application"});
    }
}
export const deleteApplication=async(req,res)=>{
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({ message: "Invalid application ID" });
    }
    try {
        const application = await Application.findOne({ _id: req.params.id, userId: req.user._id });

        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }

        await Application.deleteOne({ _id: req.params.id }); 
        res.status(200).json({ message: 'Application removed' });
    } catch (error) {
        console.error("Error deleting application:", error);
        res.status(500).json({ message: "Server error deleting application" });
    }
}