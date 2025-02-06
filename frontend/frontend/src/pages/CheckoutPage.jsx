import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { total = 0, products = [] } = location.state || {}; // Get data from Cart page

  const [userEmail, setUserEmail] = useState("");
  const [checkoutInfo, setCheckoutInfo] = useState({
    fullName: "",
    deliveryAddress: "",
    city: "",
    pinCode: "",
    phoneNumber: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("cash");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.email) {
      setUserEmail(user.email);
    }
  }, []);

  const handleChange = (e) => {
    setCheckoutInfo({ ...checkoutInfo, [e.target.name]: e.target.value });
  };

  const handleOrderNow = async (e) => {
    e.preventDefault();
  
    if (!checkoutInfo.fullName || !checkoutInfo.deliveryAddress || !checkoutInfo.city || !checkoutInfo.pinCode || !checkoutInfo.phoneNumber) {
      alert("Please fill in all required fields!");
      return;
    }
  
    if (isNaN(checkoutInfo.pinCode) || checkoutInfo.pinCode.length !== 6) {
      alert("Please enter a valid 6-digit Pin Code.");
      return;
    }
  
    if (isNaN(checkoutInfo.phoneNumber) || checkoutInfo.phoneNumber.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }
  
    const orderData = {
      email: userEmail,
      name: checkoutInfo.fullName,
      phone: checkoutInfo.phoneNumber,
      address: `${checkoutInfo.deliveryAddress}, ${checkoutInfo.city}, ${checkoutInfo.pinCode}`,
      products,
      totalPrice: total,
      orderType: paymentMethod,
    };
  
    try {
      console.log("Sending Order Data:", orderData);
      
      if (paymentMethod === "cash") {
        const response = await axios.post("https://car-spare-part-u8hk.onrender.com/api/m2/orders/createorder", orderData);
        if (response.data.success) {
          navigate("/OrderSuccess");
        } else {
          alert("Order placement failed. Try again.");
        }
      } else {
        const { data } = await axios.post("https://car-spare-part-u8hk.onrender.com/api/m2/orders/createorder", orderData);
        
        if (data.success && data.razorpayOrder) {
          // ✅ Load Razorpay script before opening modal
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.async = true;
          script.onload = () => openRazorpay(data.razorpayOrder, orderData);
          document.body.appendChild(script);
        }
      }
    } catch (error) {
      console.error("Error placing order:", error.response ? error.response.data : error.message);
      alert("Something went wrong. Please try again.");
    }
  };
  
  const openRazorpay = (razorpayOrder, orderData) => {
    if (!window.Razorpay) {
      alert("Failed to load Razorpay SDK. Please refresh and try again.");
      return;
    }
  
    const options = {
      key: "rzp_test_OCSuBCQt9OyvBC",
      amount: razorpayOrder.amount,
      currency: "INR",
      name: "Car Spare Parts",
      description: "Order Payment",
      order_id: razorpayOrder.id,
      handler: async function (response) {
        try {
          console.log("🛠 Razorpay Response:", response);
      
          // Send payment details to backend for verification and order creation
          const verifyResponse = await axios.post("https://car-spare-part-u8hk.onrender.com/api/m2/orders/verifyPayment", {
            email: orderData.email,
            name: orderData.name,
            phone: orderData.phone,
            address: orderData.address,
            products: orderData.products,
            totalPrice: orderData.totalPrice,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
      
          console.log("✅ Verify Payment Response:", verifyResponse.data);
      
          if (verifyResponse.data.success) {
            alert("🎉 Payment successful! Redirecting to order success page...");
            navigate("/OrderSuccess");
          } else {
            alert("❌ Payment verification failed. Please contact support.");
          }
        } catch (error) {
          console.error("❌ Error verifying payment:", error.response?.data || error.message);
          
          alert(
            error.response?.data?.message ||
            "⚠️ Something went wrong. Please check your internet connection and try again."
          );
        }
      },
        
      prefill: {
        email: orderData.email,
        contact: orderData.phone,
      },
      theme: {
        color: "#3399cc",
      },
    };
     
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  
  return (
    <div>      {/* Header */}
    <Header/>

    {/* Sidebar */}
    <Sidebar/>

      <div className="flex justify-center items-center min-h-screen bg-gray-50 p-2">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-gray-800 text-center pb-4">Checkout</h2>

        <form onSubmit={handleOrderNow} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Checkout Info Section */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-gray-100 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold mb-2">Checkout Info</h3>
            <p className="mb-2 text-gray-700"><strong>Email:</strong> {userEmail}</p>
            <input type="text" name="fullName" placeholder="Full Name" value={checkoutInfo.fullName} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-400 outline-none" required />
            <input type="text" name="deliveryAddress" placeholder="Address" value={checkoutInfo.deliveryAddress} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-400 outline-none" required />
            <input type="text" name="city" placeholder="City" value={checkoutInfo.city} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-400 outline-none" required />
            <input type="text" name="pinCode" placeholder="Pin Code" value={checkoutInfo.pinCode} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-400 outline-none" required />
            <input type="text" name="phoneNumber" placeholder="Phone Number" value={checkoutInfo.phoneNumber} onChange={handleChange} className="w-full p-3 border rounded-lg mb-2 focus:ring-2 focus:ring-blue-400 outline-none" required />
          </motion.div>

          {/* Payment Info Section */}
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="p-4 bg-gray-100 rounded-xl shadow-md"
          >
            <h3 className="text-lg font-semibold mb-2">Payment Info</h3>
            <p className="text-xl font-semibold pb-4 text-gray-800">Total Amount: ₹{(total || 0).toFixed(2)}</p>

            <div className="mb-2">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} className="accent-green-500" />
                <span className="text-gray-700">Cash on Delivery</span>
              </label>
            </div>

            <div className="mb-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="radio" name="payment" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} className="accent-green-500" />
                <span className="text-gray-700">Online Payment</span>
              </label>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white py-3 px-6 rounded-xl w-full mt-4 font-semibold shadow-md transition-all"
            >
              Order Now
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
    <Footer/>
    </div>
  );
};
