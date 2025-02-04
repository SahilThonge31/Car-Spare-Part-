"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

const AdvertPanel = () => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 100 }}
          className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-yellow-400 p-6 rounded-l-lg shadow-lg"
        >
          <button onClick={() => setIsOpen(false)} className="absolute top-2 right-2 text-gray-600 hover:text-gray-800">
            <X size={20} />
          </button>
          <h3 className="text-2xl font-bold mb-4">Special Offer!</h3>
          <p className="mb-4">Get 50% off on your first purchase. Limited time offer!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          >
            Claim Now
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default AdvertPanel

