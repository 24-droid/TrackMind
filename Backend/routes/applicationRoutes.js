import express from "express"
import { createApplication,getApplicationById,getApplications,updateApplication,deleteApplication } from "../controllers/applicationController.js"
import { protect } from "../middleware/authMiddleware.js"
const router=express.Router();
router.route('/')
    .post(protect, createApplication) 
    .get(protect, getApplications);   

router.route('/:id')
    .get(protect, getApplicationById)  
    .put(protect, updateApplication)   
    .delete(protect, deleteApplication); 

export default router;