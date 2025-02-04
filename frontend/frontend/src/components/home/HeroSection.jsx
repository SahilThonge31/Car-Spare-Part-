"use client"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"; // Import useNavigate
import heroimage from "../../assets/heroimage.jpg"; // Ensure the correct file extension

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleButtonClick = () => {
    navigate('/product'); // Change '/products' to your actual product page route
  };

  return (
    <section 
      className="bg-cover bg-center text-white py-20 h-screen" 
      style={{ backgroundImage: `url(${heroimage})` }} // Use the imported image
    >
      <div className="container mx-auto px-6 flex flex-col justify-center items-center h-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl font-bold mb-6 text-center text-black"
        >
          Welcome to Auto Essence..!
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl mb-12 text-center text-black"
        >
          Discover the best products and services tailored just for you.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={handleButtonClick} // Add onClick handler
          className="bg-white text-green-500 font-bold py-3 px-8 rounded-full text-lg shadow-lg hover:bg-gray-100 transition duration-300"
        >
          Explore All Products
        </motion.button>
      </div>
    </section>
  )
}

export default HeroSection;