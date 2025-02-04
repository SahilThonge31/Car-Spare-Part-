import express from 'express';
import { LoginController, RegisterController} from '../controllers/userController.js';
import {forgotPassword, verifyOtpAndResetPassword }from "../controllers/userController.js";



const router = express.Router();

// Define routes
router.post('/register', RegisterController);
router.post("/login", LoginController);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", verifyOtpAndResetPassword);

export default router;





