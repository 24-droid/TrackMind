import express from "express";
import { getUserProfile,updatedUserProfile,getUserNotificationPreferences,updateUserNotificationPreferences } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router();
router.route('/profile').get(protect,getUserProfile).put(protect,updatedUserProfile);
router.route("/me/notifications").get(protect,getUserNotificationPreferences).put(protect,updateUserNotificationPreferences);
export default router