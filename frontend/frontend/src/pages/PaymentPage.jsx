import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OrderSummary from '../components/OrderSummary';

const PaymentPage = () => {
  const navigate = useNavigate();

  // Initialize the cart with default items if localStorage is empty or invalid
  const [cartItems, setCartItems] = useState(() => {
    try {
      const storedCart = localStorage.getItem('cartItems');
      return storedCart
        ? JSON.parse(storedCart)
        : [
            { id: 1, name: 'Product 1', price: 100, quantity: 1 },
            { id: 2, name: 'Product 2', price: 200, quantity: 1 },
          ];
    } catch (error) {
      console.error('Failed to parse cart data:', error);
      return [
        { id: 1, name: 'Product 1', price: 100, quantity: 1 },
        { id: 2, name: 'Product 2', price: 200, quantity: 1 },
      ];
    }
  });

  // Sync cartItems to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleIncrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const orderSummary = {
    subtotal: calculateTotal(),
    shipping: 32.45,
    handling: 0.0,
    tax: 13.49,
    total: calculateTotal() + 32.45 + 13.49,
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { cartItems, orderSummary } });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cart Items Section */}
        <div className="md:col-span-2 bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-4"
                >
                  <div>
                    <h2 className="text-lg font-medium">{item.name}</h2>
                    <p className="text-gray-500">₹{item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrement(item.id)}
                      className="px-3 py-1 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(item.id)}
                      className="px-3 py-1 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-red-500 hover:underline ml-4"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar Section */}
        <div>
          <OrderSummary
            orderSummary={{
              subtotal: calculateTotal().toFixed(2),
              shipping: 32.45,
              handling: 0.0,
              tax: 13.49,
              total: (calculateTotal() + 32.45 + 13.49).toFixed(2),
            }}
          />
          <div className="mt-6">
            <button
              onClick={handleProceedToCheckout}
              className="block w-full bg-blue-500 text-white py-2 px-4 text-center rounded-md hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
