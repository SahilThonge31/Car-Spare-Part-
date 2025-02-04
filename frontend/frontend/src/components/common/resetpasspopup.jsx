import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const ResetPasswordPopup = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate(); // Initialize navigation

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/m2/auth/reset-password",
        { email, otp, newPassword }
      );

      if (response.data.success) {
        alert("Password reset successfully!");
        onClose(); // Close the popup
        navigate("/HomePage"); // Navigate to the home page or login popup
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black"
        >
          &times;
        </button>
        <h2 className="text-xl flex items-center justify-center font-semibold text-gray-800 mb-4">
          Reset Password
        </h2>
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label
              htmlFor="reset-email"
              className="text-gray-700 text-lg mb-2 block"
            >
              Email:
            </label>
            <input
              type="email"
              id="reset-email"
              placeholder="Enter your email"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="reset-otp"
              className="text-gray-700 text-lg mb-2 block"
            >
              OTP:
            </label>
            <input
              type="text"
              id="reset-otp"
              placeholder="Enter the OTP"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="new-password"
              className="text-gray-700 text-lg mb-2 block"
            >
              New Password:
            </label>
            <input
              type="password"
              id="new-password"
              placeholder="Enter your new password"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button onClick={()=>{
            navigate("/HomePage")
    }} 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPopup;
