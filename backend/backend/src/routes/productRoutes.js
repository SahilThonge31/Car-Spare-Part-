import express from "express";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  getProductById,
} from "../controllers/productController.js";
import upload from '../middlewares/uploadimage.js';

const router = express.Router();

// CRUD APIs for Products with image upload
router.post("/createproducts",upload.single('image'), createProduct);
router.get("/products", getAllProducts);
router.put("/products/:id", upload.single('image'), updateProduct);
router.get("/products/:id", getProductById);
router.delete("/products/:id", deleteProduct);
router.get("/products/category/:categoryId", getProductsByCategory);

export default router;