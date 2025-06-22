import cloudinary from "../config/cloudinaryConfig.js";
import upload from "../utils/multerConfig.js";
// Now writing the upload controller 
// First check if the req contains the file or not
// If it contains the file upload it using cloudinary method
// If we face any error while uploading throw that error
// Else print the response 

const uploadDocument=async(req,res)=>{
    if(!req.files)
        {
            res.status(400).json({message:"Please select a file to upload"});
        }
    const result=await cloudinary.uploader.upload_stream(
        {resource_type:'auto',folder:'trackmind_documents'},
        (error,result)=>{
            if(error)
                {
                    console.error("Cloudinary upload error",error);
                    res.status(500).json({message:"Cloudinary upload failed"});
                }
            if(result)
                {
                    res.status(200).json({
                        messsage:"File uploaded successfully!",
                        url:result.secure_url,
                        public_id:result.public_id,
                        fileName:req.file.originalname,
                    })
                }
        }
    ).end(req.file.buffer);
}
export {uploadDocument}