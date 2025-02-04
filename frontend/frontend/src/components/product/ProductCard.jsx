import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div
      key={product._id}
      className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-56 object-cover"
      />
      <div className="p-5">
        <h2 className="text-lg font-bold text-gray-700 hover:text-gray-900 truncate">
          {product.name}
        </h2>
        <p className="text-gray-500 mt-2 line-clamp-2">{product.description}</p>
        <div className="mt-2">
          <span className="text-sm text-gray-600 font-semibold">
            Category:{" "}
            <span className="text-blue-500">{product.category.name}</span>
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-green-600">
            ₹{product.price.toFixed(2)}
          </span>
          <button
            onClick={() => navigate(`/products/${product._id}`)}
            className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;