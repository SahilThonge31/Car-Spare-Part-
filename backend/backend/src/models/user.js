import mongoose from 'mongoose';


const userSchema = mongoose.Schema({

    name: {
        type: String,
        required: true

    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

    otp: { type: String },
     // To store the OTP (hashed for security)
otpExpiry: { type: Date },



}, { timestamps: true })

const User = mongoose.model("User", userSchema);

export default User;