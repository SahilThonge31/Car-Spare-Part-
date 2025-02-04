import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckoutDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();


const { cartItems = [], orderSummary = { subtotal: 0, shipping: 0, total: 0 } } = location.state || {};


  const [formData, setFormData] = useState({
    fullName: "",
    deliveryAddress: "",
    city: "",
    pinCode: "",
    phoneNumber: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveAndProceed = () => {
    const { fullName, deliveryAddress, city, pinCode, phoneNumber } = formData;

    if (!fullName || !deliveryAddress || !city || !pinCode || !phoneNumber) {
      setErrorMessage("Please fill in all required fields.");
      setSuccessMessage("");
      return;
    }

    setErrorMessage("");
    setSuccessMessage("All information is filled. Proceeding to the next step...");
    setTimeout(() => {
      navigate("/payment-info", {
        state: {
          orderSummary, // Pass order summary to Razorpay
        },
      });
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Section: Checkout Details Form */}
        <div className="flex-1 p-6">
          <header className="border-b-2 border-gray-300 pb-4 text-2xl font-bold text-gray-800">
            Checkout Details
          </header>
          <div className="mt-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">
              Shipping Information
            </h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Delivery Address</label>
                <input
                  type="text"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your delivery address"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">Pin Code</label>
                  <input
                    type="text"
                    name="pinCode"
                    value={formData.pinCode}
                    onChange={handleInputChange}
                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Pin Code"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone Number"
                />
              </div>
            </form>
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
            {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
            <button
              onClick={handleSaveAndProceed}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Proceed to Pay
            </button>
          </div>
        </div>

        {/* Right Section: Order Summary */}
<div className="md:w-1/3 bg-gray-50 p-6">
  <div className="bg-white p-4 rounded-lg shadow-lg">
    <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b-2 border-gray-300 pb-2">
      Order Summary
    </h2>
    <div className="space-y-3">
      {cartItems?.map((item) => (
        <div key={item.id} className="flex items-center justify-between text-gray-700">

          {/* Product Name & Price */}
          <div className="flex flex-col flex-grow px-2">
            <span className="font-medium">{item.name}</span>
            <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
          </div>
          <span className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
        </div>
      ))}
    </div>
    <div className="border-t mt-4 pt-4 space-y-2 text-gray-700">
      <div className="flex justify-between">
        <span>Subtotal:</span>
        <span>₹{orderSummary?.subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Shipping:</span>
        <span>₹{orderSummary?.shipping.toFixed(2)}</span>
      </div>
      <div className="flex justify-between">
        <span>Tax:</span>
        <span>₹{orderSummary?.tax.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold text-gray-900">
        <span>Total:</span>
        <span>₹{orderSummary?.total.toFixed(2)}</span>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default CheckoutDetails;