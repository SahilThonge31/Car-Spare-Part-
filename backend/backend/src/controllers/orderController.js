import Order from "../models/order.js";
import Product from "../models/product.js";
import Razorpay from "razorpay";
import sendEmail from "../utils/sendEmail.js";
import product from "../models/product.js";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, 
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});



export const createOrder = async (req, res) => {
  console.log("hellow world");
  try {
    const { email, name, products, totalPrice, phone, address, orderType } = req.body;

    if (!email || !name || !phone || !address || !products || !totalPrice || !orderType) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Convert `productId` to `product` as required by the schema
    const mappedProducts = products.map(item => ({
      product: item.productId,  // Ensure correct field mapping
      quantity: item.quantity,
    }));

    // Validate stock before creating order
    for (const item of mappedProducts) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ success: false, message: `Product not found: ${item.product}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ success: false, message: `Insufficient stock for ${product.name}` });
      }

      product.stock -= item.quantity;
      await product.save();
    }

    if (orderType === "cash") {
      const order = new Order({
        email,
        name,
        phone,
        address,
        products: mappedProducts, // Use mapped products
        totalPrice,
        orderType: "cash",
        status: "pending",
      });

      await order.save();

      if (email) {
        await sendEmail(
          email,
          "Order Confirmation",
          `Your order has been placed successfully!\nOrder ID: ${order._id}\nTotal Bill: ₹${totalPrice}`
        );
      } else {
        console.error("Error: Email is missing, cannot send order confirmation.");
      }

      return res.status(201).json({ success: true, message: "Order placed successfully", order });
    } else if (orderType === "online") {
      const razorpayOrder = await razorpay.orders.create({
        amount: totalPrice * 100, // Convert to paise
        currency: "INR",
        receipt: `order_rcptid_${Date.now()}`,
      });

      return res.status(200).json({
        success: true,
        message: "Proceed to online payment",
        razorpayOrder,
      });
    }
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Payment Verification & Order Confirmation (For Online Payments)
export const verifyPayment = async (req, res) => {
  try {
    const { email, name, products, totalPrice, phone, address, razorpay_payment_id } = req.body;

    if (!razorpay_payment_id) {
      return res.status(400).json({ success: false, message: "Payment ID is required." });
    }

    // Create the order after successful payment
    const order = new Order({
      email,
      name,
      phone,
      address,
      products,
      totalPrice,
      orderType: "online",
      paymentId: razorpay_payment_id,
      status: "pending",
    });

    await order.save();

    if (!email) {
      console.error("Error: Email is missing, cannot send payment confirmation.");
    } else {
      // Send email confirmation
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Order Confirmation",
        text: `Your payment was successful!\nOrder ID: ${order._id}\nTotal Bill: ₹${totalPrice}`,
      };

      console.log("Sending email with options:", mailOptions); // Debug log

      await sendEmail(mailOptions);
    }

    res.status(201).json({ success: true, message: "Payment successful, order placed", order });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { orderId, userId } = req.body;

    // Find the order by ID, populate product details
    const order = await Order.findById(orderId).populate('products.product');

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    // Check if the order belongs to the user
    if (order.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "You are not authorized to cancel this order" });
    }

    // Check if the order is not already canceled
    if (order.status === 'canceled') {
      return res.status(400).json({ success: false, message: "This order is already canceled" });
    }

    // Loop through each product in the order and update the stock
    for (const item of order.products) {
      const product = item.product;

      // Ensure the product is found and that the stock is a valid number
      if (product && !isNaN(product.stock)) {
        // Revert the stock back by adding the quantity of the canceled order
        product.stock += item.quantity;

        // Ensure the updated stock is valid and greater than or equal to 0
        if (product.stock < 0) {
          return res.status(400).json({ success: false, message: `Invalid stock for product: ${product.name}` });
        }

        // Save the product with the updated stock
        await product.save();
      } else {
        return res.status(400).json({ success: false, message: `Invalid product stock for ${product.name}` });
      }
    }

    // Mark the order as canceled
    order.status = 'canceled';
    await order.save();

    // Return success response
    res.status(200).json({ success: true, message: "Order canceled successfully", order });

  } catch (error) {
    console.error("Error canceling order:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Controller to get order status
export const getOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    res.status(200).json({ success: true, status: order.status });

  } catch (error) {
    console.error("Error fetching order status:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};



export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find orders for the user, populate product details with name and price
    const orders = await Order.find({ user: userId })
      .populate("products.product", "name price")
      .select("products totalPrice phone address status createdAt");

    // Check if the user has any orders
    if (orders.length === 0) {
      return res.status(404).json({ success: false, message: "No orders found for this user" });
    }

    // Return success response with orders and details
    res.status(200).json({ success: true, orders });

  } catch (error) {
    console.error("Error fetching user orders:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

