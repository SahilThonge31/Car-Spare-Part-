import { hashPassword } from "../helpers/userHelper.js";

import bcrypt from "bcrypt";
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

// Register Controller
export const RegisterController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        // Generate JWT Token
        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: savedUser,
            token,
        });
    } catch (error) {
        console.error("Error in user registration:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};

// Login Controller
export const LoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate request
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found. Please register first.",
            });
        }

        // Compare passwords using bcrypt
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials. Please try again.",
            });
        }

        // Generate JWT Token
        // Generate a token (session)
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
  
      // Optionally save session in the database if you need persistent session tracking
      user.sessionToken = token;
      await user.save();

        // Login success
        res.status(200).json({
            success: true,
            message: "Login successful",
            user: { email: user.email, name: user.name },
            token,
        });
    } catch (error) {
        console.error("Login Error Details:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error",
        });
    }
};


// Delete User
export const DeleteUserController = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                error: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
            user: deletedUser,
        });
    } catch (error) {
        res.status(501).json({
            success: false,
            error: "Error in deleting user",
        });
    }
};


// Forgot Password: Send OTP
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    // Save OTP and expiry in the database
    user.otp = otpHash;
    user.otpExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    // Send OTP via email
    await sendEmail(
      user.email,
      "Password Reset OTP",
      `Your OTP for password reset is: ${otp}`
    );

    // Respond with the OTP in the response (for debugging or controlled environments)
    res.status(200).json({ message: "OTP sent to your email", otp: otp });
  } 
  catch (error) {
    res.status(500).json({ message: "Error sending OTP", error: error.message });
  }
};

// Verify OTP and Reset Password
export const verifyOtpAndResetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Verify OTP
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");
    if (user.otp !== otpHash || user.otpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password and clear OTP
    user.password = hashedPassword;
    user.otp = undefined;
    user.otpExpiry = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Error resetting password", error: error.message });
  }
};