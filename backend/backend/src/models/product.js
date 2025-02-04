import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  
  image: {
    type: String,  
    required: false, 
  },
  stock: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => !isNaN(value) && value >= 0,
      message: 'Stock must be a valid number and cannot be negative',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
