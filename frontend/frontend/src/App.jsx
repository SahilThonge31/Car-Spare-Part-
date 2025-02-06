import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ResetPassword from './pages/resetpass';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import ProfilePage from './pages/ProfilePage';
import ContactForm from './pages/ContactUs';
import AboutUs from './pages/aboutus';
import ForgotPasswordPopup from './components/common/forgotpasspopup';
import ResetPasswordPopup from './components/common/resetpasspopup';
import CreateProductForm from './pages/AddProduct';
import NotificationPage from './pages/notificationpage';
import ProductDetailPage from './pages/ProductDetailPage';
import Cart from './pages/CartPage';
import CheckoutDetails from './pages/CheckoutPage';
import OrderSuccess from './pages/orderSuccess';






function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/HomePage" />} />  // Redirect to Login by default
        <Route path="/HomePage" element={<HomePage/>} />
        <Route path="/resetpass" element={<ResetPassword  />} />
        <Route path="/product" element={< ProductPage />} />
        <Route path="/addproduct" element={<CreateProductForm/>} />
        <Route path="/profile" element={< ProfilePage />} />
        <Route path="/contact" element={< ContactForm />} />
        <Route path="/aboutus" element={< AboutUs />} />
        <Route path="/notification" element={< NotificationPage />} />
        <Route path="/products/:category" element={<ProductPage />} /> 
        <Route path="/product/:id" element={<ProductDetailPage/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout" element={<CheckoutDetails/>} />
        <Route path="/OrderSuccess" element={<OrderSuccess/>} />
        
        <Route
          path="/forgot-password"
          element={<ForgotPasswordPopup onClose={() => window.history.back()} />}
        />
          <Route
          path="/reset-password"
          element={<ResetPasswordPopup onClose={() => window.history.back()} />}
        />
      </Routes>
    </Router>
  );
}

export default App;