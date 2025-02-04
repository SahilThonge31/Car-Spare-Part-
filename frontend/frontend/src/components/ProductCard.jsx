import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg bg-white p-4 m-4">
      <div className="font-bold text-xl mb-2">{product.name}</div>
      <p className="text-gray-700 text-base">{product.description}</p>
      <p className="text-lg font-semibold text-gray-800 mt-2">${product.price}</p>
      <p className="text-sm text-gray-600 mt-2">Category: {product.category.name}</p>
    </div>
  );
};

export default ProductCard;
