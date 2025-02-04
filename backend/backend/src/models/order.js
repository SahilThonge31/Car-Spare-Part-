import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "shipped", "canceled", "completed"],
      default: "pending",
    },
    orderType: {  // New field for order type
      type: String,
      enum: ["cash", "online"], // Allowed order types
      required: true, // Make it required
    },
    paymentId: { // Store Razorpay payment ID (if online)
      type: String,
      required: function () { // Conditionally required
        return this.orderType === "online";
      },
    },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model("Order", orderSchema);