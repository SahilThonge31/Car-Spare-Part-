import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import "animate.css";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white py-10">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
        {/* About Section */}
        <div className="animate__animated animate__fadeInLeft">
          <h3 className="text-xl font-semibold mb-4 text-green-400">About Us</h3>
          <p className="text-sm text-gray-400">
          You can buy car spare parts from many places in Pune, including spare part dealers, online retailers, and auto parts stores. 

          </p>
        </div>

        {/* Links Section */}
        <div className="animate__animated animate__fadeInUp">
          <h3 className="text-xl font-semibold mb-4 text-green-400">Quick Links</h3>
          <ul className="text-sm space-y-3">
            <li>
              <a href="/" className="text-gray-400 hover:text-green-400 transition-all duration-300 ease-in-out">
                Home
              </a>
            </li>
            <li>
              <a href="/aboutus" className="text-gray-400 hover:text-green-400 transition-all duration-300 ease-in-out">
                About
              </a>
            </li>
            <li>
              <a href="/product" className="text-gray-400 hover:text-green-400 transition-all duration-300 ease-in-out">
                Shop
              </a>
            </li>
            <li>
              <a href="/contact" className="text-gray-400 hover:text-green-400 transition-all duration-300 ease-in-out">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="animate__animated animate__fadeInRight">
          <h3 className="text-xl font-semibold mb-4 text-green-400">Contact Us</h3>
          <p className="text-sm text-gray-400 mb-2">Email: carsparestore3@gmail.com</p>
          <p className="text-sm text-gray-400">Phone: +91 9011881272</p>
        </div>

        {/* Social Media Section */}
        <div className="animate__animated animate__fadeIn">
          <h3 className="text-xl font-semibold mb-4 text-green-400">Follow Us</h3>
          <div className="flex space-x-4">
            <a
              href="#"
              className="bg-blue-600 text-white rounded-full p-2 hover:scale-110 transition transform duration-300"
            >
              <FaFacebook size={24} />
            </a>
            <a
              href="#"
              className="bg-blue-400 text-white rounded-full p-2 hover:scale-110 transition transform duration-300"
            >
              <FaTwitter size={24} />
            </a>
            <a
              href="#"
              className="bg-pink-500 text-white rounded-full p-2 hover:scale-110 transition transform duration-300"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="#"
              className="bg-blue-700 text-white rounded-full p-2 hover:scale-110 transition transform duration-300"
            >
              <FaLinkedin size={24} />
            </a>
            <a
              href="#"
              className="bg-red-600 text-white rounded-full p-2 hover:scale-110 transition transform duration-300"
            >
              <FaYoutube size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-6 animate__animated animate__fadeInUp text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Auto Essence. All rights reserved.
        </p>
        <p className="text-xs text-gray-600 mt-2">
          Designed with ❤️ by <a href="/HomePage" className="text-green-400 hover:underline">Auto Essence</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
