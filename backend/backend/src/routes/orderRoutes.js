import express from "express";
import { cancelOrder, createOrder, createSingleOrder, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/singleorder", createSingleOrder);


router.post("/createorder", createOrder);

router.get("/:userId", getUserOrders);

router.post("/cancel", cancelOrder);



export default router;
