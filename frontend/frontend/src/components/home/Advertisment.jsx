import React, { useState, useEffect } from "react";

const Advertisement = () => {
  const slides = [
    {
      id: 1,
      image:
        "https://w0.peakpx.com/wallpaper/625/891/HD-wallpaper-modern-engine-renault-car-parts-generator-gearbox-car-engine.jpg",
      label: "4 Stroke Engine",
      description:
        "Discover the latest trends in automotive engineering. Perfect for innovation seekers.",
      link: "/products/Engine",
    },
    {
      id: 2,
      image:
        "https://media.istockphoto.com/id/185507812/photo/car-silencer.jpg?s=612x612&w=0&k=20&c=IPinrYsDaHA-HpsJK5Sq6P6PuGS6kwFRDoTfY9qwTZU=",
      label: "Exclusive Collection of Exhaust",
      description:
        "Step into exclusivity with premium car parts designed for performance enthusiasts.",
      link: "/products/Silencer",
    },
    {
      id: 3,
      image:
        "https://www.shutterstock.com/shutterstock/videos/1100642123/thumb/1.jpg?ip=x480",
      label: "Best Sellers of Brake Pads",
      description:
        "Shop our most popular car parts, trusted by thousands of drivers worldwide.",
      link: "/products/Brakes",
    },
    {
      id: 4,
      image:
        "https://www.shutterstock.com/image-photo/refueling-pouring-oil-quality-into-600nw-2342070825.jpg",
      label: "Trending Now",
      description:
        "Stay ahead with the latest innovations in car maintenance and accessories.",
      link: "/products/Oil",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="relative w-full max-w-6xl p-6 md:p-8 lg:p-12 bg-white rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left Section - Text Content */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800">
              {slides[currentSlide].label}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed pb-8">
              {slides[currentSlide].description}
            </p>
          </div>

          {/* Right Section - Image Slider */}
          <div className="relative overflow-hidden rounded-lg shadow-lg w-full h-96">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
                  index === currentSlide
                    ? "translate-x-0 opacity-100 z-10"
                    : "translate-x-full opacity-0 z-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.label}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
                  {slide.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advertisement;
