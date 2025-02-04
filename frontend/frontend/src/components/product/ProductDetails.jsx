// File: ProductDetails.js

import React from "react";

const ProductDetails = ({ product }) => {
  return (
    <div className="p-6">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-gray-700 mt-2">{product.description}</p>
      <p className="text-xl font-semibold mt-4">${product.price}</p>
      <button className="bg-green-500 text-white px-6 py-2 mt-4 rounded hover:bg-green-600">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;
