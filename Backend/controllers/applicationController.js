import Application from "../models/Application.model.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinaryConfig.js"
const uploadFilesToCloudinary=async(files)=>{
    if(!files||files.length==0)
        {
            return [];
        }

const uploadPromises = files.map(file => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: 'auto', folder: 'trackmind_documents' },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return reject(new Error('Cloudinary upload failed for a file.'));
          }
          resolve({
            url: result.secure_url,
            public_id: result.public_id,
            fileName: file.originalname,
          });
        }
      ).end(file.buffer);
    });
  });

  return Promise.all(uploadPromises);
}
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
        const newDocuments = await uploadFilesToCloudinary(req.files);
    try {
        const newApplication=await Application.create({
            userId:req.user._id,
            jobTitle,
            company,
            status,
            deadline,
            applicationLink,
            notes,
            documents:newDocuments,
        })
        const createdApplication = await newApplication.save();
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
export const updateApplication = async (req, res) => {
    
    const { jobTitle, company, status, deadline, applicationLink, notes } = req.body;
    console.log('DEBUG: req.user in updateApplication:', req.user);
    
    let existingDocuments = [];
    if (req.body.documents) {
      try {
        existingDocuments = JSON.parse(req.body.documents);
        if (!Array.isArray(existingDocuments)) {
          throw new Error('Documents field must be a valid JSON array.');
        }
      } catch (e) {
        res.status(400);
        throw new Error('Invalid documents data: ' + e.message);
      }
    }
  
    const application = await Application.findById(req.params.id);
    console.log('DEBUG: application found:', application ? 'Yes' : 'No');
    if (application) {
        console.log('DEBUG: application._id:', application._id);
        console.log('DEBUG: application.user:', application.user);
    }
  
    if (application && application.user.toString() === req.user._id.toString()) {
      application.jobTitle = jobTitle !== undefined ? jobTitle : application.jobTitle;
      application.company = company !== undefined ? company : application.company;
      application.status = status !== undefined ? status : application.status;
      application.deadline = deadline !== undefined ? deadline : application.deadline;
      application.applicationLink = applicationLink !== undefined ? applicationLink : application.applicationLink;
      application.notes = notes !== undefined ? notes : application.notes;
  
      
      const newlyUploadedDocuments = await uploadFilesToCloudinary(req.files);
  
      
      application.documents = [...existingDocuments, ...newlyUploadedDocuments];
  
  
      const updatedApplication = await application.save();
      res.json(updatedApplication);
    } else if (application && application.user.toString() !== req.user._id.toString()) {
      res.status(403); 
      throw new Error('Not authorized to update this application');
    } else {
      res.status(404);
      throw new Error('Application not found');
    }
  };
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