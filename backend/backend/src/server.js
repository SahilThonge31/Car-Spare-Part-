import express from "express";
import cors from "cors"; 
// Import the cors package
import authRoutes from './routes/userRoute.js'; // Import the auth routes
import productRoutes from './routes/productRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'
import orderRoutes from './routes/orderRoutes.js';
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cartRoutes from './routes/cartRoutes.js';

const app = express();
const port = process.env.PORT || 4000;  // Use the port from .env or default to 4000

dotenv.config();

// CORS configuration to allow frontend requests from specific origin
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB connection
connectDB();

// Use the authentication routes
app.use("/api/m2/auth", authRoutes);
app.use('/api/m2/products', productRoutes);
app.use('/api/m2/categories', categoryRoutes);
app.use('/api/m2/orders', orderRoutes);
app.use('/api/m2/cart', cartRoutes);  // Prefix the routes with /api/user

// Start the server
app.listen(port, (error) => {
  if (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
  console.log(`Server running at http://localhost:${port}`);
});
