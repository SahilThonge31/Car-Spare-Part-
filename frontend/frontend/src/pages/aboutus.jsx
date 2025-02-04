import React from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";
import StickyCart from "../components/common/cart";
import "animate.css";

const AboutUs = () => {
  return (
    <div>
        <Header/>

        <Sidebar/>


    <div className="bg-gradient-to-br from-gray-100 to-gray-300 from-indigo-50 to-blue-100 min-h-screen py-10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-6 animate__animated animate__fadeInDown">
            About Us
          </h1>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto animate__animated animate__fadeInUp">
            We are dedicated to providing the best products and services to our customers. 
            Learn more about our journey, mission, and the passionate team behind our success.
          </p>
        </section>

        {/* Mission & Vision Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600">
              Our mission is to deliver high-quality solutions that empower individuals 
              and businesses to achieve their goals with confidence and ease.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-8 transform transition duration-500 hover:scale-105 hover:shadow-xl">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
            <p className="text-gray-600">
              To be the global leader in our industry, setting benchmarks for innovation, 
              sustainability, and customer satisfaction.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-12 animate__animated animate__fadeIn">Meet Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {/* Team Member 1 */}
            <div className="text-center transform transition duration-500 hover:scale-105">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-28 h-28 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
              <p className="text-gray-600">CEO & Founder</p>
            </div>
            {/* Team Member 2 */}
            <div className="text-center transform transition duration-500 hover:scale-105">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-28 h-28 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
              <p className="text-gray-600">Chief Marketing Officer</p>
            </div>
            {/* Team Member 3 */}
            <div className="text-center transform transition duration-500 hover:scale-105">
              <img
                src="https://via.placeholder.com/150"
                alt="Team Member"
                className="w-28 h-28 rounded-full mx-auto mb-4 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-800">Alex Johnson</h3>
              <p className="text-gray-600">Head of Development</p>
            </div>
          </div>
        </section>
      </div>
    </div>

    <StickyCart/>

         {/* Footer */}
         <Footer />

    </div>
  );
};

export default AboutUs;
