import express from "express";
import { cancelOrder, createOrder, getUserOrders, verifyPayment } from "../controllers/orderController.js";

const router = express.Router();

router.post("/verifyPayment", verifyPayment);

router.post("/createorder", createOrder);

router.get("/:userId", getUserOrders);

router.post("/cancel", cancelOrder);



export default router;
