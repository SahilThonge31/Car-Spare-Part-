import React, { useState } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";
import HeroSection from "../components/home/HeroSection";
import FeaturedProducts from "../components/home/FeaturedProducts";
import ServicesSection from "../components/home/ServicesSection";
import TestimonialsSection from "../components/home/Testimonials";
import CarSlider from "../components/home/brandpage";
import StickyCart from "../components/common/cart";
import Adervertisment from "../components/home/Advertisment";


const HomePage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const userId = localStorage.getItem("email");
  console.log("userid:",userId);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
        
  };

  return (
    <div>
      {/* Header */}
      <Header/>

      {/* Sidebar */}
      <Sidebar/>

      {/* Hero Section */}
      <HeroSection />
 

      < Adervertisment/>

      <CarSlider />

      {/* Featured Products Section */}
      <FeaturedProducts />

      {/* Services Section */}
      <ServicesSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      <StickyCart/>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
