import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Razorpay = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderSummary } = location.state || {};

  useEffect(() => {
    if (!orderSummary) {
      navigate("/checkout-details");
    }
  }, [orderSummary, navigate]);

  const handlePayment = async () => {
    const options = {
      key: "rzp_test_OCSuBCQt9OyvBC", // Replace with your Razorpay key ID
      amount: orderSummary.total * 100, // Amount in paisa
      currency: "INR",
      name: "Your Store Name",
      description: "Payment for Order",
      image: "/logo.png", // Replace with your logo URL if available
      handler: (response) => {
        console.log("Payment successful!", response);
        alert("Payment successful! Order ID: " + response.razorpay_payment_id);
        navigate("/success");
      },
      prefill: {
        name: "Your Customer Name",
        email: "customer@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (response) => {
      console.error("Payment failed", response.error);
      alert("Payment failed! Please try again.");
    });
    rzp.open();
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 shadow-lg rounded-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Proceed to Payment</h1>
        <p className="mb-4">
          You are about to pay <span className="font-bold">₹{orderSummary?.total.toFixed(2)}</span>.
        </p>
        <button
          onClick={handlePayment}
          className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
        >
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Razorpay;
