import express from "express"
import { createApplication,getApplicationById,getApplications,updateApplication,deleteApplication } from "../controllers/applicationController.js"
import { protect } from "../middleware/authMiddleware.js"
import upload from "../utils/multerConfig.js";
const router = express.Router();
router.route('/').get(protect, getApplications);
router.route('/').post(protect, upload.array('document'), createApplication); 
router
  .route('/:id')
  .get(protect, getApplicationById)
  .put(protect, upload.array('document'), updateApplication) 
  .delete(protect, deleteApplication);

export default router;