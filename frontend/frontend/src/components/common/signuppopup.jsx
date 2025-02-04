import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const SignUpPopup = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);

    try {
      const response = await axios.post(
        "http://localhost:4000/api/m2/auth/register",
        { name, email, password }
      );

      console.log("Response:", response.data);

      if (response.data.success) {
        alert(response.data.message); // Show success alert

        // Store token in localStorage for session management
        localStorage.setItem("authToken", response.data.token);

        // Optionally store user details if needed
        localStorage.setItem("user", JSON.stringify(response.data.user));

        // Redirect to HomePage with a short delay
        setTimeout(() => {
          navigate("/HomePage");
          window.location.reload(); // Force page refresh
        }, 200); // Delay for 200ms
      } else {
        alert(response.data.message); // Show error message
      }
    } catch (error) {
      console.error("Signup error:", error);
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  const handleGoogleSignup = () => {
    // Redirect to Google signup endpoint
    window.location.href = "http://localhost:4000/signup/google";
  };

  const handleFacebookSignup = () => {
    // Redirect to Facebook signup endpoint
    window.location.href = "http://localhost:4000/signup/facebook";
  };

  return (
    <>
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
            &times;
          </button>

          {/* Form Content */}
          <h2 className="text-xl flex items-center justify-center z-50 font-semibold text-gray-800 mb-4">
            Create your account
          </h2>
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-600 font-medium">
                Name *
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600 font-medium">
                Email *
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-600 font-medium"
              >
                Password *
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Sign Up
            </button>
          </form>
          <div className="text-center mt-4">
          </div>
          <div className="flex items-center mt-6">
            <hr className="w-full border-gray-300" />
            <span className="px-2 text-gray-500">or</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="flex flex-col mt-6 space-y-2">
            <button
              onClick={handleGoogleSignup}
              className="flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            >
              Sign Up with Google
            </button>
            <button
              onClick={handleFacebookSignup}
              className="flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Sign Up with Facebook
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpPopup;
