// File: SearchBar.js

import React from "react";

const SearchBar = () => {
  return (
    <div className="relative">
      <input
        type="text"
        className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search for products..."
      />
      <button className="absolute right-2 top-2 text-blue-500">
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default SearchBar;
