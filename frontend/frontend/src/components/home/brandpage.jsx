import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const brands = [
  { id: 1, name: "Tesla", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyofJBSm6dTe6O3ThGfnriU01tW2dVbfTG8Q&s" },
  { id: 2, name: "BMW", image: "https://www.pngplay.com/wp-content/uploads/13/BMW-Logo-PNG-Background.png" },
  { id: 3, name: "Audi", image: "https://www.freepnglogos.com/uploads/audi-logo-2.png" },
  { id: 4, name: "Toyota", image: "https://www.wallpaperflare.com/static/194/1000/1016/toyota-logo-wallpaper.jpg" },
  { id: 5, name: "Mercedes", image: "https://images.seeklogo.com/logo-png/33/2/mercedes-benz-logo-png_seeklogo-332844.png" },
  { id: 6, name: "Tata Motors", image: "https://i.pinimg.com/736x/5b/ac/94/5bac942d02e70ce67498bf2ff04efe97.jpg" },
  { id: 7, name: "Mahindra", image: "https://logos-world.net/wp-content/uploads/2021/09/Mahindra-Mahindra-Logo.png" },
  { id: 8, name: "Maruti Suzuki", image: "https://wallpapers.com/images/hd/suzuki-logo-metallic-texture-u9e5sygo4ho2stji-2.jpg" },
  { id: 9, name: "Hyundai", image: "https://images7.alphacoders.com/122/1222940.png" },
  { id: 10, name: "Honda", image: "https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700246176.jpg" },
  { id: 11, name: "MG Motors", image: "https://1000logos.net/wp-content/uploads/2021/10/MG-Logo-2010.png" },
  { id: 12, name: "Volkswagen", image: "https://w0.peakpx.com/wallpaper/276/573/HD-wallpaper-volkswagen-logo-elegence-logo-volkswagen.jpg" },
];

const CarSlider = () => {
  const [hoveredBrand, setHoveredBrand] = useState(null);
  const [sliderWidth, setSliderWidth] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.scrollWidth - sliderRef.current.offsetWidth);
    }
  }, []);

  return (
    <section className="py-20 bg-gray-100 w-full flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-12 text-center">
        Multi Brand Product Showcase
      </h2>
      <div className="relative w-full max-w-6xl overflow-hidden">
        <motion.div
          ref={sliderRef}
          className="flex space-x-8 cursor-grab"
          drag="x"
          dragConstraints={{ left: -sliderWidth, right: 0 }}
          whileTap={{ cursor: "grabbing" }}
        >
          {brands.map((brand) => (
            <motion.div
              key={brand.id}
              className="relative cursor-pointer flex-shrink-0 mx-3"
              onMouseEnter={() => setHoveredBrand(brand.id)}
              onMouseLeave={() => setHoveredBrand(null)}
            >
              <div className="w-28 h-28 md:w-36 md:h-36 bg-white flex items-center justify-center rounded-full shadow-lg border-4 border-gray-300 transform transition-transform hover:scale-110">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-full"
                />
              </div>
              <h3 className="text-md md:text-lg font-semibold text-gray-800 text-center mt-3">
                {brand.name}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CarSlider;
