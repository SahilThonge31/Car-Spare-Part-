import Product from "../models/product.js";
import fs from "fs/promises";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinaryConfig.js";
import { Category } from "../models/category.js";
// import { v2 } from 'cloudinary';

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    console.log("FILE : ", req.file);
    

    if (!mongoose.Types.ObjectId.isValid(category)) {
      if (req.file) {
        fs.unlink(req.file.path);
      }
      return res
        .status(400)
        .json({ success: false, error: "Invalid category ID" });
    }
    const categoryData = await Category.find({name: category});
if (!categoryData) {
  if (req.file) {
    fs.unlink(req.file.path);
  }
  return res
    .status(404)
    .json({ success: false, error: "Category not found" });
}


    const filepath = req.file.path;
    console.log(filepath);
    

    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(filepath, {
      folder: "products",
    });

    const newProduct = new Product({
      name,
      description,
      price,
      stock,
      category,
      image: uploadResult.url,
    });

    await newProduct.save();
    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);

    if (req.file) {
      fs.unlink(req.file.path);
    }

    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("category", "name");

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid category ID" });
    }

    const products = await Product.find({ category: categoryId }).populate(
      "category",
      "name"
    );

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found in this category",
      });
    }

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log("productId",id);
    

    if (!id) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid product ID" });
    }

    const product = await Product.findById(id).populate("category", "name");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, image } = req.body;

    if (category && !mongoose.Types.ObjectId.isValid(category)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid category ID" });
    }

    let updatedImage = image;

    if (req.file) {
      if (image) {
        const publicId = image.split("/").pop().split(".")[0]; 
        await cloudinary.uploader.destroy(`products/${publicId}`);
      }

      updatedImage = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, description, price, stock, category, image: updatedImage },
      { new: true }
    );

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Invalid product ID" });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const imageUrl = product.image;
    if (imageUrl) {
      const publicId = imageUrl.split("/").pop().split(".")[0];
      await cloudinary.uploader
        .destroy(`products/${publicId}`)
        .catch((error) => {
          console.error("Error deleting image from Cloudinary:", error);
        });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
