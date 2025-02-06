import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";
import axios from "axios";

const ProductDetailPage = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(1); // Quantity state
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`https://car-spare-part-u8hk.onrender.com/api/m2/products/products/${id}`);
        const data = await response.json();

        if (data.success) {
          setProduct(data.product);
          fetchRelatedProducts(data.product.category.name);
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    const fetchRelatedProducts = async (category) => {
      try {
        const response = await fetch("https://car-spare-part-u8hk.onrender.com/api/m2/products/products");
        const data = await response.json();

        if (data.success) {
          const filteredProducts = data.products.filter(
            (product) => product.category.name === category && product._id !== id
          );
          setRelatedProducts(filteredProducts);
        } else {
          console.error("Failed to fetch related products");
        }
      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const email = localStorage.getItem("email"); // Get the email from localStorage

      // Check if email and token are available
      if (!email || !token) {
        alert("Please log in to add items to the cart.");
        navigate("/HomePage");
        return;
      }

      // Ensure product and quantity are available
      if (!product || !quantity) {
        alert("Product or quantity is missing.");
        return;
      }

      const payload = {
        productId: product._id,
        quantity: quantity,
      };

      console.log("Payload:", payload); // Debugging

      // Make the API call using axios
      const response = await axios.post(
        `https://car-spare-part-u8hk.onrender.com/api/m2/cart/add/${email}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data); // Debugging

      if (response.data.success) {
        alert(`${product.name} added to cart!`);
        navigate("/cart"); // Navigate to the cart page
      } else {
        alert(`Failed to add to cart: ${response.data.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(
        error.response?.data?.message ||
        "An error occurred while adding to cart."
      );
    }
  };

  const handleBuyNow = () => {
    const totalPrice = product.price * quantity; // Calculate total price
    
    const singleorder = {
      productId: product._id,
      quantity: quantity, 
    };

    navigate("/checkout", {
      state: {
        products : singleorder,
        total : totalPrice,
         // Pass total price
     },
    });
  };



  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <Sidebar />

      <div className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-100 object-cover"
            />
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-gray-200 rounded-lg shadow-lg p-8"
          >
            <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
              {product.name}
            </h1>
            <p className="text-gray-600 text-lg mb-6">{product.description}</p>

            <div className="mb-6">
              <span className="text-sm text-gray-600 font-semibold">
                Category:{" "}
                <span className="text-blue-500">{product.category.name}</span>
              </span>
            </div>

            {/* Quantity Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                min="1"
                className="mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-col space-y-4">
              {/* Price */}
              <span className="text-3xl font-bold text-green-600">
                ₹{product.price.toFixed(2)}
              </span>

              <div className="flex items-center space-x-4 pt-5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
                  onClick={() => navigate(-1)}
                >
                  Back to Products
                </motion.button>

                {/* Add to Cart Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <motion.div
                key={relatedProduct._id}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                onClick={() => navigate(`/product/${relatedProduct._id}`)}
                className="cursor-pointer"
              >
                <ProductCard product={relatedProduct} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;