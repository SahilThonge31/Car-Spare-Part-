// import Category from "../models/category.js";

import { Category } from "../models/category.js";

export const createCategory = async(req,res)=>{
    try{
        const {name}=req.body;

        const newCategory = new Category({name});
        const savedCategory = await newCategory.save();

        res.status(201).json({
            success:true,
            message:"Category created successfully",
            category:savedCategory,
        });
    }catch(error){
        console.log("Error creating category: ",error);
        res.status(501).json({
            success:false,
            error:"Internal server error ",
        });
    }
};

export const getProductByCategories = async(req,res)=>{

    const category = req.params;
    try {
        const categories = await Category.find({category});
        res.status(201).json({
            success:true,
            categories,
        });
    } catch (error) {
        console.log("Error fetching categories:",error);
        res.status(501).json({
            success:false,
            error:"Internal server error ",
        });
    }
};

export const getAllCategories = async(req,res)=>{
    try {
        
        const categories = await Category.find();
        res.status(201).json({
            success:true,
            categories,
        });
    } catch (error) {
        console.log("Error fetching categories:",error);
        res.status(501).json({
            success:false,
            error:"Internal server error ",
        });
    }
};

export const updateCategory = async(req,res)=>{
    try {
        const {name}=req.body;

        const updateCategory = await Category.findByIdAndUpdate(
            req.params.id,
            {name},
            {new:true}
        );

        if(!updateCategory){
            return res.status(401).json({
                success:false,
                message:"Category not found",
            });
        }

        res.status(201).json({
            success:true,
            message:"Category updated successfully",
            category:updateCategory,
        });
    } catch (error) {
        console.log("Error updating category: ",error);
        res.status(501).json({
            success:false,
            error:"Internal server error",
        });
    }
};

export const deleteCategory = async(req,res)=>{
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);

        if(!deletedCategory){
            return res.status(401).json({
                success:false,
                message:"Category not found",
            });
        }

        res.status(201).json({
            success:true,
            message:"Category deleted successfully ",
        });
    } catch (error) {
        console.error("Error deleting category: ",error);
        res.status(501).json({
            success:false,
            error:"Internal server error",
        });
    }
};
