import express, { Router } from "express";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../controllers/categoryController.js";


const router = Router();

router.post("/createcategories", createCategory);
router.get("/getcategories",getAllCategories);
router.put("/categories/:id",updateCategory);
router.delete("/categories/:id",deleteCategory);

export default router;