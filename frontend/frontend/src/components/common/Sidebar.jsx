import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHome, AiFillBell } from "react-icons/ai"; // Home, Notifications
import { FaShoppingCart, FaProductHunt } from "react-icons/fa"; // Products, Add Product
import { MdInfo, MdContactPage } from "react-icons/md"; // About Us, Contact
import { HiMenu } from "react-icons/hi"; // Toggle Button

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="p-2 text-white bg-gray-800 fixed top-4 left-4 z-50 rounded-full shadow-md hover:bg-gray-700"
      >
        <HiMenu className="h-6 w-6" />
      </button>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100 z-40" : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-800 text-white w-64 transition-transform duration-300 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 text-2xl font-bold border-b border-gray-700">
          My Store
        </div>
        <nav className="mt-6">
          <ul>
            <li className="mb-4">
              <Link
                to="/"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
              >
                <AiFillHome className="h-5 w-5 mr-3" />
                Home
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/product"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
              >
                <FaShoppingCart className="h-5 w-5 mr-3" />
                Explore All Products
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/addproduct"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
              >
                <FaProductHunt className="h-5 w-5 mr-3" />
                Add Product
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/notification"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
              >
                <AiFillBell className="h-5 w-5 mr-3" />
                Notifications
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/contact"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
              >
                <MdContactPage className="h-5 w-5 mr-3" />
                Contact
              </Link>
            </li>
            <li className="mb-4">
              <Link
                to="/aboutus"
                className="flex items-center px-4 py-2 hover:bg-gray-700"
              >
                <MdInfo className="h-5 w-5 mr-3" />
                About Us
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
