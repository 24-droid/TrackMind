import express from "express";
import { getUserProfile,updatedUserProfile,getUserNotificationPreferences,updateUserNotificationPreferences,getMe,logoutUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router=express.Router();
router.route('/profile').get(protect,getUserProfile).put(protect,updatedUserProfile);
router.route("/me/notifications").get(protect,getUserNotificationPreferences).put(protect,updateUserNotificationPreferences);
router.route('/me').get( protect, getMe);
router.route('/logout').post(logoutUser);
export default router