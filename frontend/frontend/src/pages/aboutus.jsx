import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";
import StickyCart from "../components/common/cart";
import "animate.css";
import { FaCheckCircle, FaWrench, FaTruck, FaShieldAlt } from "react-icons/fa";

const AboutUs = () => {
  return (
    <div>
      <Header />
      <Sidebar />

      <div className="bg-gradient-to-br from-gray-100 to-gray-300 min-h-screen py-12">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero Section */}
          <section className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-800 mb-6 animate__animated animate__fadeInDown">
              About Us
            </h1>
            <p className="text-gray-700 text-lg max-w-2xl mx-auto animate__animated animate__fadeInUp">
              We are dedicated to providing **high-quality car spare parts** and services to keep your vehicles running smoothly. Learn about our journey, mission, and commitment to excellence.
            </p>
          </section>

          {/* Mission & Vision Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                Our mission is to deliver **premium car spare parts** with unmatched reliability, ensuring safety and performance for all our customers.
              </p>
            </div>
            <div className="bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To become the **leading global supplier** of automobile spare parts by offering innovative, durable, and high-performance products.
              </p>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="mb-16">
            <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transform transition duration-500 hover:scale-105">
                <FaShieldAlt className="text-blue-500 text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">Genuine Quality</h3>
                <p className="text-gray-600">We provide **authentic** and **certified** spare parts ensuring durability and safety.</p>
              </div>
              <div className="text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transform transition duration-500 hover:scale-105">
                <FaWrench className="text-blue-500 text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">Expert Support</h3>
                <p className="text-gray-600">Our team of experts is always ready to assist you in choosing the right parts for your vehicle.</p>
              </div>
              <div className="text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transform transition duration-500 hover:scale-105">
                <FaTruck className="text-blue-500 text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">Fast Delivery</h3>
                <p className="text-gray-600">We ensure **quick and hassle-free delivery** to get your vehicle back on the road faster.</p>
              </div>
              <div className="text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transform transition duration-500 hover:scale-105">
                <FaCheckCircle className="text-blue-500 text-5xl mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800">Affordable Prices</h3>
                <p className="text-gray-600">We offer **competitive pricing** without compromising on quality.</p>
              </div>
            </div>
          </section>

          {/* Our Commitment to Quality */}
          <section className="bg-white shadow-lg rounded-lg p-10 mb-16 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <h2 className="text-4xl font-bold text-gray-800 text-center mb-6">Our Commitment to Quality</h2>
            <p className="text-gray-600 text-center max-w-3xl mx-auto">
              We rigorously test all our **car spare parts** to ensure they meet the highest industry standards. Every component is **thoroughly inspected** for safety, durability, and performance.
            </p>
          </section>

          {/* Team Section */}
          <section>
            <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12 animate__animated animate__fadeIn">
              Meet Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {/* Team Member 1 */}
              <div className="text-center transform transition duration-500 hover:scale-105">
                <img
                  src="https://manshedauctions.com.au/wp-content/uploads/2023/12/testimonial-1.png"
                  alt="Team Member"
                  className="w-28 h-28 rounded-full mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-800">SAHIL THONGE</h3>
                <p className="text-gray-600">TEAM LEADER</p>
              </div>
              {/* Team Member 2 */}
              <div className="text-center transform transition duration-500 hover:scale-105">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTX63d8sF9p8Au_apk_y4lx_6Ohieb0bp8dhg&s"
                  alt="Team Member"
                  className="w-28 h-28 rounded-full mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-800">DARSHAN RAUNDAL</h3>
                <p className="text-gray-600">TEAM MEMBER</p>
              </div>
              {/* Team Member 3 */}
              <div className="text-center transform transition duration-500 hover:scale-105">
                <img
                  src="https://www.kindpng.com/picc/m/72-723761_student-png-sammilani-mahavidyalaya-undergraduate-and-dummy-user.png"
                  alt="Team Member"
                  className="w-28 h-28 rounded-full mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-800">GANESH DURGE</h3>
                <p className="text-gray-600">TEAM MEMBER</p>
              </div>
              <div className="text-center transform transition duration-500 hover:scale-105">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2825/2825216.png"
                  alt="Team Member"
                  className="w-28 h-28 rounded-full mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-800">SAKSHI SHINDE</h3>
                <p className="text-gray-600">TEAM MEMBER</p>
              </div>
              <div className="text-center transform transition duration-500 hover:scale-105">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/6902/6902216.png"
                  alt="Team Member"
                  className="w-28 h-28 rounded-full mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-800">VAISHAVI PAWASKAR</h3>
                <p className="text-gray-600">TEAM MEMBER</p>
              </div>
              <div className="text-center transform transition duration-500 hover:scale-105">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/560/560200.png"
                  alt="Team Member"
                  className="w-28 h-28 rounded-full mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-xl font-semibold text-gray-800">DIVYA PAWAR</h3>
                <p className="text-gray-600">TEAM MEMBER</p>
              </div>
            </div>
          </section>
        </div>
      </div>

      <StickyCart />
      <Footer />
    </div>
  );
};

export default AboutUs;
