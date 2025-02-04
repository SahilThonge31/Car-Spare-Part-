import { useState, useEffect } from "react";
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
      products, // Send product IDs array
      totalPrice: total, 
      orderType: paymentMethod,
    };
    

    try {
      console.log("Sending Order Data:", orderData);
      if (paymentMethod === "cash") {
        const response = await axios.post("http://localhost:4000/api/m2/orders/createorder", orderData);

        console.log("Order Response:", response.data);
        if (response.data.success) {
          navigate("/order-success");
        } else {
          alert("Order placement failed. Try again.");
        }
      } else {
        const { data } = await axios.post("http://localhost:4000/api/m2/orders/createorder", orderData);
        if (data.success && data.razorpayOrder) {
          const options = {
            key: process.env.REACT_APP_RAZORPAY_KEY || "rzp_test_defaultKey",
            amount: data.razorpayOrder.amount,
            currency: "INR",
            name: "Car Spare Parts",
            description: "Order Payment",
            order_id: data.razorpayOrder.id,
            handler: async function (response) {
              console.log("Razorpay Response:", response);
              const verifyResponse = await axios.post("http://localhost:4000/api/m2/verify-payment", {
                ...orderData,
                razorpay_payment_id: response.razorpay_payment_id,
              });
              if (verifyResponse.data.success) {
                navigate("/order-success");
              }
            },
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      }
    } catch (error) {
      console.error("Error placing order:", error.response ? error.response.data : error.message);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <form onSubmit={handleOrderNow} className="grid md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Checkout Info</h3>
          <p className="mb-2"><strong>Email:</strong> {userEmail}</p>
          <input type="text" name="fullName" placeholder="Full Name" value={checkoutInfo.fullName} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <input type="text" name="deliveryAddress" placeholder="Address" value={checkoutInfo.deliveryAddress} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <input type="text" name="city" placeholder="City" value={checkoutInfo.city} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <input type="text" name="pinCode" placeholder="Pin Code" value={checkoutInfo.pinCode} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
          <input type="text" name="phoneNumber" placeholder="Phone Number" value={checkoutInfo.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-2">Payment Info</h3>
          <p className="text-xl font-semibold pb-6">Total Amount: ₹{(total || 0).toFixed(2)}</p>

          <div className="mb-2">
            <label className="flex items-center">
              <input type="radio" name="payment" value="cash" checked={paymentMethod === "cash"} onChange={() => setPaymentMethod("cash")} />
              <span className="ml-2">Cash on Delivery</span>
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input type="radio" name="payment" value="online" checked={paymentMethod === "online"} onChange={() => setPaymentMethod("online")} />
              <span className="ml-2">Online Payment</span>
            </label>
          </div>
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg w-full mt-2">Order Now</button>
        </div>
      </form>
    </div>
  );
}
