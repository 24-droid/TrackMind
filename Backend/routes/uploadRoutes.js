import express from "express";
import { uploadDocument } from "../controllers/uploadController.js";
import {protect} from "../middleware/authMiddleware.js"
import upload from "../utils/multerConfig.js";
const router=express.Router();
router.post('/document',protect,upload.single('document'),uploadDocument);
export default router;