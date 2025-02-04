import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!email) {
        alert("Please log in to view your cart.");
        navigate("/HomePage");
        return;
      }

      try {
        const response = await fetch(`http://localhost:4000/api/m2/cart/${email}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response from backend:", data);

        if (data.success && data.cart && Array.isArray(data.cart.items)) {
          setCartItems(data.cart.items);
          
        } else {
          setError("Failed to fetch cart items");
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setError("Could not load cart items. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [email, navigate]);

  // const removeFromCart = async (itemId) => {
  //   try {
  //     const response = await fetch(`http://localhost:4000/api/m2/cart/remove`, {
  //       method: "DELETE",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
  //       },
  //       body: JSON.stringify({ itemId, email }),
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to remove item");
  //     }

  //     setCartItems(cartItems.filter(item => item._id !== itemId));
  //   } catch (error) {
  //     console.error("Error removing item:", error);
  //   }
  // };
  const handleCheckout = () => {
    const products = cartItems.map(item => ({
      productId: item.productId._id, // Extract only the product ID
      quantity: item.quantity,
    }));
  
    navigate("/checkout", {
      state: {
        products,
        total,
      },
    });
  };
  
  
  if (loading) {
    return <div className="text-center text-lg font-bold">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div>
        <Header />
        <Sidebar />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center h-screen"
        >
          <motion.div className="text-4xl font-bold text-gray-800 mb-4">
            Your Cart is Empty
          </motion.div>
          <motion.div className="text-lg text-gray-600 mb-8">
            Start shopping to add items to your cart.
          </motion.div>
          <Link to="/product">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
        <Footer />
      </div>
    );
  }

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div>
      <Header />
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6"
      >
        <h1 className="text-3xl font-bold mb-8">SHOPPING CART</h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="grid grid-cols-5 gap-4 p-4 border-b font-semibold">
            <div>PRODUCT</div>
            <div>PRICE</div>
            <div>QUANTITY</div>
            <div>TOTAL</div>
            <div></div>
          </div>

          {cartItems.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-5 gap-4 p-4 border-b"
            >
              <div className="flex items-center">
                <p className="font-semibold">{item.name}</p>
              </div>

              <div>₹ {item.price.toFixed(2)}</div>
              <div>{item.quantity}</div>
              <div>₹ {(item.price * item.quantity).toFixed(2)}</div>
              <div>
                <button className="text-red-500 hover:text-red-700">
                  Remove
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-between mt-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-300"
          >
            Update Cart
          </motion.button>
          <Link to="/product">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </div>

        <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">PAYMENT INFO</h2>

          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              Don't have any code yet? Go to our promotional program
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="Promo Code Here"
                className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-r-lg hover:bg-blue-600 transition-colors duration-300"
              >
                Apply
              </motion.button>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-gray-600">Subtotal: ₹ {subtotal.toFixed(2)}</p>
            <p className="text-gray-600">Flat rate: ₹ {shipping.toFixed(2)}</p>
            <p className="text-green-600">Free Shipping</p>
          </div>

          <div className="mt-6">
            <p className="text-2xl font-bold">Total: ₹ {total.toFixed(2)}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
              className="mt-4 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition-colors duration-300"
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Cart; 