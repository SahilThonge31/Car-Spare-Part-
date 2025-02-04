import express from "express";
import {
  addToCart,
  removeFromCart,
  getCart,

} from "../controllers/cartController.js";

const router = express.Router();

// Route to add item to cart or update quantity
router.post("/add/:email", addToCart);

// Route to remove item from cart
router.delete("/remove", removeFromCart);

// Route to get user's cart details
router.get("/:email", getCart);


export default router;
