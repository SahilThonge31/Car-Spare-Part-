import React, { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";
import axios from "axios";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
    company: "",
  });
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");
    try {
      const response = await axios.post(
        "https://car-spare-part-u8hk.onrender.com/api/m2/contacts",
        formData
      );
      setResponseMessage({ type: "success", text: response.data.message });
      setFormData({ name: "", email: "", message: "", phone: "", company: "" });
    } catch (error) {
      setResponseMessage({ type: "error", text: "Error submitting the form" });
    } finally {
      setLoading(false);
    }
  };

  return (

    <div>
      <Header/>

      <Sidebar/>

      
      <div className="max-w-6xl mx-auto pt-9 p-8 bg-gradient-to-br from-gray-100 to-gray-300 rounded-lg shadow-md space-y-8">
        {/* Header Section */}
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
          <p className="text-gray-600">We would love to hear from you! Reach out to us anytime.</p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Your Phone (optional)"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            name="company"
            placeholder="Your Company (optional)"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded focus:ring-2 focus:ring-blue-500"
          ></textarea>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
          {responseMessage && (
            <p
              className={`text-center mt-4 ${
                responseMessage.type === "success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {responseMessage.text}
            </p>
          )}
        </form>

        {/* Contact Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-xl font-semibold mb-4 text-blue-600 flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-blue-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 4.5l16.5 7.5-16.5 7.5V4.5z"
                />
              </svg>
              <span>Our Contact Details</span>
            </h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center space-x-3">
                <span className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10h3M21 10h-3M5.7 6.3A9.963 9.963 0 0112 4a9.963 9.963 0 016.3 2.3M4 18h16M12 4v16"
                    />
                  </svg>
                </span>
                <p>
                  <strong>Phone:</strong> +1 234 567 890
                </p>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 2.5h4m-2-2v4m-11 11v4m2-2h-4M3 9l5 5M3 3l4 4m0 10l-4 4m7-7v5m3-5l-3 3"
                    />
                  </svg>
                </span>
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:support@example.com"
                    className="text-blue-500 underline"
                  >
                    support@example.com
                  </a>
                </p>
              </li>
              <li className="flex items-center space-x-3">
                <span className="bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 10v4M21 10v4M12 4v16"
                    />
                  </svg>
                </span>
                <p>
                  <strong>Address:</strong> 1234 Main Street, City, Country
                </p>
              </li>
            </ul>
          </div>

          {/* Interactive Map */}
          <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-md">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434508289!2d144.95373631531695!3d-37.816279742021695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5777b6d6f0e3e7c!2sFlinders%20Street%20Station!5e0!3m2!1sen!2s!4v1614245083926!5m2!1sen!2s"
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
            <div className="absolute bottom-0 left-0 w-full bg-gray-900 bg-opacity-50 text-white p-3">
              <p>Find us here!</p>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ContactForm;
