import React, { useState, useEffect } from "react";

const carBrands = [
  {
    id: 1,
    name: "Tesla",
    image: "https://via.placeholder.com/80x80?text=Tesla",
    description: "Innovative electric vehicles with cutting-edge technology.",
  },
  {
    id: 2,
    name: "BMW",
    image: "https://via.placeholder.com/80x80?text=BMW",
    description: "Luxury performance cars with German engineering.",
  },
  {
    id: 3,
    name: "Audi",
    image: "https://via.placeholder.com/80x80?text=Audi",
    description: "High-quality cars with modern designs and Quattro technology.",
  },
  {
    id: 4,
    name: "Toyota",
    image: "https://via.placeholder.com/80x80?text=Toyota",
    description: "Reliable vehicles with a focus on efficiency and durability.",
  },
  {
    id: 5,
    name: "Mercedes",
    image: "https://via.placeholder.com/80x80?text=Mercedes",
    description: "The epitome of luxury and performance for decades.",
  },
];

const CarSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hoveredBrand, setHoveredBrand] = useState(null);

  // Automatic sliding of brands
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carBrands.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Multi Brand Product</h2>
        <div className="flex space-x-6 overflow-hidden justify-center">
          {carBrands.map((brand, index) => (
            <div
              key={brand.id}
              className={`relative cursor-pointer transition-transform duration-700 ${
                index === currentIndex ? "scale-110" : "scale-100"
              }`}
              onMouseEnter={() => setHoveredBrand(brand.id)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full mb-4 shadow-md">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-20 h-20 object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{brand.name}</h3>
              {hoveredBrand === brand.id && (
                <div className="absolute top-36 left-1/2 transform -translate-x-1/2 bg-white border border-gray-300 shadow-lg rounded-lg p-4 w-64 text-gray-700 text-sm z-10">
                  <p>{brand.description}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarSlider;
