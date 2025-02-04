import React, { useState } from 'react';
import axios from 'axios'; // Don't forget to import axios
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [otpSent, setOtpSent] = useState(false); // Track OTP sent status
  const [otp, setOtp] = useState(""); // Store OTP
  const [newPassword, setNewPassword] = useState(""); // Store new password

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/m2/auth/forgot-password", { email });
      setMessage(response.data.message);
      
      setOtpSent(true); // Set OTP sent status to true
    } catch (error) {
      setMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/m2/auth/forgot-password", {
        otp,
        newPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to reset password');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-gray-700 to-gray-900 text-white">
      <h4 className="text-white text-3xl mb-4">Forgot Password</h4>
      <div className="bg-white rounded-lg p-8 shadow-lg w-11/12 max-w-md">
        {!otpSent ? (
          <>
            <label htmlFor="email" className="text-gray-700 text-lg mb-2 block">Email:</label>
            <input 
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              onClick={handleEmailSubmit}
              className="w-full p-3 bg-orange-500 text-white text-lg rounded hover:bg-orange-600 transition duration-300"
            >
              Send OTP
            </button>
            {message && <p className="text-green-500 mt-2">{message}</p>}
          </>
        ) : (
          <>
            <label htmlFor="otp" className="text-gray-700 text-lg mb-2 block">Enter OTP:</label>
            <input 
              type="text"
              name="otp"
              id="otp"
              placeholder="Enter the OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="text-gray-500 w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <label htmlFor="newPassword" className="text-gray-700 text-lg mb-2 block">New Password:</label>
            <input 
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <button 
              onClick={handleOtpSubmit}
              className="w-full p-3 bg-orange-500 text-white text-lg rounded hover:bg-orange-600 transition duration-300"
            >
              Reset Password
            </button>
            {message && <p className="text-green-500 mt-2">{message}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
