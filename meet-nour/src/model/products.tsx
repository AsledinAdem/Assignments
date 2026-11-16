import "server-only";
import mongoose, { Schema, Model } from "mongoose";
import { Order } from "@/types/order";

const productSchema = new Schema<Order>(
  {
    customerName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      validate: Number.isFinite,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isFinite,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
      validate: Number.isFinite,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true },
);

// Reuse the model when Next.js reloads the file.
const Product: Model<Order> =
  mongoose.models.Product || mongoose.model<Order>("Product", productSchema);

export default Product;

// MongoDB collection: products.
// MongoDB adds _id.
// timestamps adds createdAt and updatedAt.
// Price is a simple demo field, not a complete money model.
