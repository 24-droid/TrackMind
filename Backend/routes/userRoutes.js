import express from "express";
import { getUserProfile,updatedUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router();
router.route('/profile').get(protect,getUserProfile).put(protect,updatedUserProfile);
export default router