import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext.jsx"; // Import Auth Context


const LoginPopup = ({ onClose, onForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Use Context

  const handleGoogleSignup = () => {
    window.location.href = "http://localhost:4000/signup/google";
  };

  const handleFacebookSignup = () => {
    window.location.href = "http://localhost:4000/signup/facebook";
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://car-spare-part-u8hk.onrender.com/api/m2/auth/login", {
        email,
        password,
      });
  
      console.log(response.data); // Log the entire response for debugging
  
      if (response.data.success) {
        alert(response.data.message);
  
        // Store all user data in localStorage
        const userData = response.data.user; // Assuming the user data is nested under 'user'
        const authToken = response.data.token; // Assuming the token is returned in the response
  
        // Store token and user data in localStorage
        localStorage.setItem("authToken", authToken); // Store the authentication token
        localStorage.setItem("user", JSON.stringify(userData)); // Store the entire user object as a JSON string
  
        // Optionally, store individual fields if needed
        localStorage.setItem("userId", userData._id); // Store user ID
        localStorage.setItem("email", userData.email); // Store email
        localStorage.setItem("name", userData.name); // Store name (if available)
        // localStorage.setItem(email)
  
        // Update global auth state (assuming `login` is a function to update global state)
        login(userData);
  
        // Redirect to the home page after a short delay
        setTimeout(() => {
          navigate("/HomePage"); // Redirect to the home page
          window.location.reload(); // Refresh to update state (optional, use only if necessary)
        }, 200);
      } else {
        alert(response.data.message); // Show error message from the backend
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "An error occurred during login.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-black">
          &times;
        </button>
        <h2 className="text-xl flex items-center justify-center font-semibold text-gray-800 mb-4">
          Log In
        </h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700 text-lg mb-2 block">
              Email:
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-700 text-lg mb-2 block">
              Password:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Link
            to="/forgot-password"
            onClick={onForgotPassword}
            className="text-gray-500 font-bold hover:underline pb-2 hover:text-green-600 transition duration-300 ease-in-out mb-4 block"
          >
            Forgot Password?
          </Link>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Log In
          </button>
        </form>
        <div className="flex items-center mt-6">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>
        <div className="flex flex-col mt-6 space-y-2">
          <button onClick={handleGoogleSignup} className="flex items-center justify-center bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">
            Sign Up with Google
          </button>
          <button onClick={handleFacebookSignup} className="flex items-center justify-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
            Sign Up with Facebook
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
