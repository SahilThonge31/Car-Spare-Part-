import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";

const NotificationPage = () => {
  const [activeTab, setActiveTab] = useState("Offers & Coupon");
  const [notifications, setNotifications] = useState([]);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();
    fetchSuggestedProducts();
  }, []);

  // Fetch order notifications from backend
  const fetchNotifications = async () => {
    try {
      const response = await fetch("https://car-spare-part-u8hk.onrender.com/api/orders/notifications");
      const data = await response.json();
      if (data.success) {
        setNotifications(data.notifications);
      } else {
        console.error("Failed to fetch notifications");
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Fetch suggested products from backend
  const fetchSuggestedProducts = async () => {
    try {
      const response = await fetch("https://car-spare-part-u8hk.onrender.com/api/m2/products/products");
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
        setSuggestedProducts(filteredProducts);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div>
      <Header />

      <Sidebar/>

      <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
        {/* Header */}
        <div className="w-full max-w-2xl flex justify-between items-center py-4 px-4 bg-white shadow-md rounded-lg">
          <button
            className="text-gray-700 text-lg font-semibold hover:text-green-600"
            onClick={() => navigate(-1)}
          >
            {"<"} Back
          </button>
          <h1 className="text-xl font-bold text-gray-800">Notifications</h1>
        </div>

        {/* Tab Buttons */}
        <div className="w-full max-w-2xl flex mt-6 gap-2">
          <button
            className={`flex-1 py-3 rounded-lg font-medium ${
              activeTab === "Offers & Coupon"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("Offers & Coupon")}
          >
            Offers & Coupons
          </button>
          <button
            className={`flex-1 py-3 rounded-lg font-medium ${
              activeTab === "Order Update"
                ? "bg-green-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("Order Update")}
          >
            Order Updates
          </button>
        </div>

        {/* Notification Section */}
        <div className="w-full max-w-2xl bg-white flex flex-col items-center mt-8 p-6 rounded-lg shadow-md">
          {activeTab === "Offers & Coupon" ? (
            <>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyLEv-J5SqxmUL7SqdwshWo67oylRn8QVsng&s"
                alt="Offers & Coupons"
                className="w-40 h-40 object-contain"
              />
              <p className="text-gray-700 text-center mt-4">
                Exciting offers are waiting for you! Check back soon for amazing
                deals on spare parts.
              </p>
            </>
          ) : (
            <>
              {notifications.length === 0 ? (
                <>
                  <img
                    src="https://via.placeholder.com/150/CCCCCC/000000?text=Orders"
                    alt="Order Updates"
                    className="w-36 h-36 object-contain"
                  />
                  <p className="text-gray-700 text-center mt-4">
                    No new updates on your orders. We'll notify you when there's a
                    change!
                  </p>
                </>
              ) : (
                <div className="w-full">
                  {notifications.map((notification, index) => (
                    <div
                      key={index}
                      className="p-4 border-b border-gray-300 text-gray-800"
                    >
                      <h3 className="font-semibold">
                        Order #{notification.orderId}
                      </h3>
                      <p className="text-sm">{notification.message}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(notification.date).toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Suggested Products Section */}
        <div className="w-full max-w-2xl bg-white flex flex-col mt-8 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedProducts.map((item) => (
              <div
                key={item._id}
                className="flex items-center gap-4 p-4 bg-gray-100 rounded-lg shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={item.image || "https://via.placeholder.com/100"}
                  alt={item.name}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Continue Shopping Button */}
        <button
          className="bg-green-500 text-white px-8 py-3 mt-8 rounded-full shadow-md hover:bg-green-600 hover:shadow-lg transition"
          onClick={() => navigate("/HomePage")}
        >
          Continue Shopping
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default NotificationPage;
