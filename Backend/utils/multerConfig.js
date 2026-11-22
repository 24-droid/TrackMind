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
            'audio/wav',
            'audio/webm',
            'audio/mpeg',
            'audio/mp3',
            'video/webm' // Browsers often record audio as video/webm
        ];
    if(allowedMimes.includes(file.mimetype))
        {
            cb(null,true);
        }
    else{
        cb(new Error(`Invalid file type: ${file.mimetype}. Only PDF, DOC, Images, and Audio are allowed.`), false);
    }
    }
})
export default upload;