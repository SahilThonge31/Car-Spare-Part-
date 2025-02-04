import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate  } from "react-router-dom";

const ForgotPasswordPopup = ({ onClose, onResetPassword }) => {

    const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/m2/auth/forgot-password",
        { email }
      );

      if (response.data.success) {
        alert("Password reset email sent.");
        onResetPassword(); // Trigger ResetPasswordPopup
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
          Forgot Password
        </h2>
        <form onSubmit={handleForgotPasswordSubmit}>
          <div className="mb-4">
            <label
              htmlFor="forgot-email"
              className="text-gray-700 text-lg mb-2 block"
            >
              Enter your email:
            </label>
            <input
              type="email"
              id="forgot-email"
              placeholder="Enter your email"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button onClick={()=>{
            navigate("/reset-password")
    }} 
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;
