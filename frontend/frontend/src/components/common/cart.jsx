import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const StickyCart = () => {
  return (
    <div
      className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition duration-300 z-50"
      style={{ cursor: "pointer" }}
    >
      <Link to="/cart" className="flex items-center justify-center">
        <FaShoppingCart className="text-4xl" />
      </Link>
    </div>
  );
};

export default StickyCart;
