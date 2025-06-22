// We will be storing the files in buffer and then upload it on cloudinary
import multer from "multer"
const storage=multer.memoryStorage();
const upload=multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024, //5MB
    },
    fileFilter:(req,file,cb)=>{
        const allowedMimes=[
            'application/pdf',
            'application/msword', // .doc
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
            'image/jpeg',
            'image/png',
        ];
    if(allowedMimes.includes(file.mimetype))
        {
            cb(null,true);
        }
    else{
        cb(new Error('Invalid file type. Only PDF, DOC, DOCX, JPEG, PNG are allowed.'), false);
    }
    }
})
export default upload;