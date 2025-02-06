import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, User, ShoppingCart, Heart, MoonIcon, SunIcon, Globe } from "lucide-react";
import { AuthContext } from "../Context/AuthContext.jsx";
import Header from "../components/common/Header";
import Sidebar from "../components/common/Sidebar";
import axios from "axios";

const ProfilePage = ({ onCartClick, onLikedClick }) => {
  const [isDarkMode, setIsDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const { user, setUser, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) return;

        const response = await axios.get("http://localhost:4000/api/m2/auth/profile", {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData();
  }, [setUser]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    localStorage.setItem("darkMode", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
  };
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const indianLanguages = [
    { code: "en", label: "English" },
    { code: "hi", label: "हिन्दी" },
    { code: "bn", label: "বাংলা" },
    { code: "ta", label: "தமிழ்" },
    { code: "te", label: "తెలుగు" },
    { code: "mr", label: "मराठी" },
    { code: "gu", label: "ગુજરાતી" },
    { code: "ml", label: "മലയാളം" },
    { code: "pa", label: "ਪੰਜਾਬੀ" },
    { code: "or", label: "ଓଡ଼ିଆ" },
    { code: "as", label: "অসমীয়া" },
    { code: "ur", label: "اُردُو" }
  ];

  return (
    <div>
      <Header />
      <Sidebar />
      <div className={`flex justify-center items-center min-h-screen p-6 ${isDarkMode ? "bg-gray-900 text-gray" : "bg-gray-100 text-gray-800"}`}>
        <Card className={`w-full max-w-xs rounded-2xl shadow-lg p-6 ${isDarkMode ? "bg-gray-800" : "bg-white"}`}>
          <div className="text-center">
            <div className={`rounded-t-2xl py-3 font-medium ${isDarkMode ? "bg-gray-700 text-gray-200" : "bg-blue-100 text-gray-700"}`}>
              Profile
            </div>
            <div className="w-20 h-20 mx-auto mt-4 flex items-center justify-center bg-green-600 text-white text-3xl font-bold rounded-full">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <h2 className="mt-2 text-lg font-semibold">{user?.name || "N/A"}</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm">{user?.email || "N/A"}</p>
          </div>

          <div className="mt-6 space-y-4">
            <OptionItem icon={<Settings size={20} />} label="Customize Profile" onClick={() => navigate("/profile-settings")} />
            <OptionItem icon={<ShoppingCart size={20} />} label="Cart" onClick={onCartClick} />
            <OptionItem icon={<Heart size={20} />} label="Liked Items" onClick={onLikedClick} />
            <OptionItem icon={<User size={20} />} label="Log Out" onClick={handleLogout} />

            <div className="flex justify-between items-center border-t pt-4">
              <div className="flex items-center space-x-2">
                <Globe size={20} />
                <select value={language} onChange={handleLanguageChange} className="bg-transparent focus:outline-none text-gray-600 dark:text-gray-400">
                  {indianLanguages.map((lang) => (
                    <option key={lang.code} value={lang.code}>{lang.label}</option>
                  ))}
                </select>
              </div>
              <Button onClick={toggleDarkMode}>{isDarkMode ? <SunIcon size={20} /> : <MoonIcon size={20} />}</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const OptionItem = ({ icon, label, onClick }) => (
  <Button onClick={onClick} className="flex items-center w-full space-x-3 p-3 rounded-lg text-left hover:bg-gray-200 dark:hover:bg-gray-700 transition">
    {icon}
    <span className="text-gray-600 dark:text-gray-400">{label}</span>
  </Button>
);

const Card = ({ children, className }) => (
  <div className={`rounded-lg shadow-md bg-white dark:bg-gray-800 p-5 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, className = "" }) => (
  <button onClick={onClick} className={`px-4 py-2 rounded-lg focus:outline-none ${className}`}>{children}</button>
);

export default ProfilePage;