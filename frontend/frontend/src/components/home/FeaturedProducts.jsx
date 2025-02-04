import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/m2/products/products");
        const data = await response.json();
        if (data.success) {
          // Shuffle products and get 3 products from different categories
          const shuffledProducts = data.products.sort(() => 0.5 - Math.random());
          const categories = new Set();
          const filteredProducts = shuffledProducts.filter((product) => {
            if (!categories.has(product.category) && categories.size < 3) {
              categories.add(product.category);
              return true;
            }
            return false;
          });
          setProducts(filteredProducts);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <Link
                to={`/product/${product.id}`} // Direct to specific product page
                key={product.id}
                className="bg-white p-6 shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <h3 className="text-xl font-semibold mt-4">{product.name}</h3>
                <p className="text-lg font-bold text-blue-500 mt-2">₹{product.price}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;
