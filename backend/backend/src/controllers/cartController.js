import Cart from "../models/cart.js";
import Product from "../models/product.js";
import Order from "../models/order.js";
import User from "../models/user.js"
import mongoose from "mongoose"; 

export const addToCart = async (req, res) => {
  try {
    const { email } = req.params;
    const {  productId, quantity } = req.body;

    // Validate input
    if (!email || !productId || !quantity) {
      return res.status(400).json({ success: false, message: "Invalid input" });
    }

    // Find the product to get its price
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // Find the user's cart using email
    let cart = await Cart.findOne({ email }); // Corrected field name

    // If cart doesn't exist, create a new one
    if (!cart) {
      cart = new Cart({ email, items: [] }); // Corrected field name
    }

    // Check if the product already exists in the cart
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId // Corrected field name
    );

    if (existingItem) {
      // Update quantity if the product already exists
      existingItem.quantity += quantity;
    } else {
      // Add new product to the cart
      cart.items.push({ productId, quantity, price: product.price }); // Corrected field name
    }

    // Calculate total price
    cart.totalPrice = cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

    // Save the cart
    await cart.save();

    res.status(200).json({ success: true, message: "Product added to cart", cart });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const productIndex = cart.items.findIndex(
      (item) => item.product.toString() === new mongoose.Types.ObjectId(productId).toString()
    );

    if (productIndex === -1)
      return res.status(404).json({ message: "Product not found in cart" });

    cart.items.splice(productIndex, 1);
    cart.totalPrice = cart.items.reduce((acc, item) => acc + item.totalPrice, 0);
    cart.updatedAt = Date.now();
    await cart.save();

    return res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error removing from cart", error });
  }
};

export const getCart = async (req, res) => {
  try {
    const { email } = req.params;

    // Find the cart and populate the productId field in items
    const cart = await Cart.findOne({ email }).populate("items.productId"); // Change to productId
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    return res.status(200).json({ success: true, cart });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error fetching cart", error });
  }
};

