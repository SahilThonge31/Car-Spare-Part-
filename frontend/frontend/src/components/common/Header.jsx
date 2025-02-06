import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import { FiUser, FiLogIn } from "react-icons/fi";
import LoginPopup from "../common/loginpopup";
import SignUpPopup from "../common/signuppopup";
import ForgotPasswordPopup from "./forgotpasspopup";
import ResetPasswordPopup from "./resetpasspopup";
import { toast } from "react-toastify";

const Header = () => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://car-spare-part-u8hk.onrender.com/api/m2/categories/getcategories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();

        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          throw new Error("Categories response is not valid");
        }
      } catch (error) {
        toast.error("Error fetching categories");
        console.error("Categories fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    localStorage.removeItem("rzp_checkout_anon_id");
    localStorage.removeItem("rzp_device_id");
    localStorage.removeItem("rzp_stored_checkout_id");

    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  return (
    <>
      {/* Main Header Section */}
      <header className="bg-gray-800 text-white shadow-md sticky top-0 z-50 p-2">
        <div className="container mx-auto flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center space-x-2 ml-4 md:ml-16">
            <FaCar className="text-green-500" />
            <span>Auto Essence</span>
          </Link>

          {/* Navigation and User Section */}
          <div className="flex items-center space-x-6">
            {isLoggedIn ? (
              <div className="relative">
                <div
                  className="flex items-center space-x-2 cursor-pointer hover:text-green-500"
                  onClick={toggleDropdown}
                >
                  <FiUser className="text-2xl" />
                  <span>{user?.name || "User"}</span>
                </div>

                {/* Dropdown Menu */}
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg">
                    <ul className="py-2">
                      <li
                        className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer font-medium transition duration-200 ease-in-out"
                        onClick={() => navigate("/profile")}
                      >
                        View Profile
                      </li>
                      <li
                        className="px-4 py-2 text-black hover:bg-red-100 cursor-pointer font-medium transition duration-200 ease-in-out"
                        onClick={handleLogout}
                      >
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Sign In */}
                <button
                  onClick={() => setShowLoginPopup(true)}
                  className="hover:text-green-500 flex items-center space-x-3"
                >
                  <FiLogIn />
                  <span className="hidden md:inline">Sign In</span>
                </button>

                {/* Sign Up */}
                <button
                  onClick={() => setShowSignUpPopup(true)}
                  className="hover:text-green-500 flex items-center space-x-3 pr-4 md:pr-8"
                >
                  <FiUser />
                  <span className="hidden md:inline">Sign Up</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Category Navigation Bar */}
        <div className="bg-gray-900 py-2">
          <div className="container mx-auto flex items-center space-x-6 overflow-x-auto whitespace-nowrap px-4 md:justify-center scrollbar-hide">
            {isLoading ? (
              <span className="text-white">Loading...</span>
            ) : (
              categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/products/${category.name}`}
                  className="text-gray-300 hover:text-green-500 text-sm md:text-base font-medium transition duration-300 px-3 py-1"
                >
                  {category.name}
                </Link>
              ))
            )}
          </div>
        </div>
      </header>

      {/* Login Popup */}
      {showLoginPopup && (
        <LoginPopup
          onClose={() => setShowLoginPopup(false)}
          onLoginSuccess={(userData) => {
            setIsLoggedIn(true);
            setUser(userData);
          }}
        />
      )}

      {/* Sign Up Popup */}
      {showSignUpPopup && <SignUpPopup onClose={() => setShowSignUpPopup(false)} />}

      {/* Forgot Password Popup */}
      {showForgotPassword && (
        <ForgotPasswordPopup
          onClose={() => {
            setShowForgotPassword(false);
            setShowLoginPopup(true);
          }}
          onResetPassword={() => {
            setShowForgotPassword(false);
            setShowResetPassword(true);
          }}
        />
      )}

      {/* Reset Password Popup */}
      {showResetPassword && (
        <ResetPasswordPopup
          onClose={() => {
            setShowResetPassword(false);
            setShowLoginPopup(true);
          }}
        />
      )}

      {/* Custom CSS for hiding scrollbar */}
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </>
  );
};

export default Header;
