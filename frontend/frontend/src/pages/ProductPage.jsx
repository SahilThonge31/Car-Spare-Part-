import React, { useState, useEffect } from "react";
import { useParams, useNavigate} from "react-router-dom";
import ProductCard from "../components/ProductCard";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();
  const navigate = useNavigate() 


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/m2/products/products");
        const data = await response.json();

        if (data.success) {
          const filteredProducts = category
            ? data.products.filter((product) => product.category.name === category)
            : data.products;

          setProducts(filteredProducts);
          
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [category]); // Refetch products when the category changes

  return (
    <div>
      <Header />

      <Sidebar />

      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          {category ? `Products in "${category}"` : "Explore Our Products"}
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              {/* Product Info */}
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-700 hover:text-gray-900 truncate">
                  {product.name}
                </h2>
                <p className="text-gray-500 mt-2 line-clamp-2">
                  {product.description}
                </p>

                {/* Product Category */}
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
                  onClick={() => {
                    navigate(`/product/${product._id}`)
                  }}
                   className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
