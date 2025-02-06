import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Sidebar from "../components/common/Sidebar";

const CreateProductForm = ({ onProductCreated }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    image: null,
    stock: "",
  });

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://car-spare-part-u8hk.onrender.com/api/m2/categories/getcategories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();

        if (data.success && Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          throw new Error("Categories response is not valid");
        }
      } catch (error) {
        toast.error("Error fetching categories");
        console.error("Categories fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProductData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productData.name || !productData.price || !productData.category || !productData.stock) {
      toast.error("Please fill all required fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("price", parseFloat(productData.price));
    formData.append("category", productData.category);
    formData.append("stock", parseInt(productData.stock));

    if (productData.image) {
      formData.append("image", productData.image);
    }

    try {
      const response = await fetch(
        "https://car-spare-part-u8hk.onrender.com/api/m2/products/createproducts",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Product creation failed");
      }

      const responseData = await response.json();
      toast.success("Product added successfully!");

      setProductData({
        name: "",
        description: "",
        price: "",
        category: "",
        image: null,
        stock: "",
      });

      e.target.reset();

      if (onProductCreated) {
        onProductCreated(responseData.product); // Pass the product to parent
      }

      navigate("/product"); // Redirect to the product page after success
    } catch (error) {
      toast.error(error.message || "Failed to add product");
      console.error("Product creation error:", error);
    }
  };

  return (
    <div>
      <Header />
      <Sidebar />
      <div className="max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg transform transition hover:scale-105 duration-300 pt-6">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Create Product
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Name */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={productData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={productData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              placeholder="Enter product description"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              placeholder="Enter product price"
              min="0"
              step="0.01"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Category</label>
            <select
              name="category"
              value={productData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              required
              disabled={isLoading}
            >
              <option value="">Select Category</option>
              {isLoading && <option>Loading...</option>}
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Product Image */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Product Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">Stock</label>
            <input
              type="number"
              name="stock"
              value={productData.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm"
              placeholder="Enter stock quantity"
              min="0"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition transform duration-300 font-semibold"
          >
            Create Product
          </button>
        </form>
        <ToastContainer />
      </div>
      <Footer />
    </div>
  );
};

export default CreateProductForm;
