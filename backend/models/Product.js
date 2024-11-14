import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Product model schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false,
  },
  rating: {
    type: Number, // Avg. of all reviews tied to the product 
    required: false,
    min: 1, // Minimum rating
    max: 5, // Maximum rating
    default: 0,
  },
  ingredients: {
    type: [String], // Array of strings for ingredients
    required: true,
  },
  category: {
    type: Number, // Bitwise number representing product type
    required: false, // e.g., moisturizer, cleanser
  },
  skinType: {
    type: Number, // Bitwise number representing skin type
    required: false,
    default: 0, // Default to no skin type
  },
  concerns: {
    type: Number, // Bitwise number representing skin concerns
    required: false,
    default: 0, // Default to no concerns
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = model("Product", productSchema);
export default Product;
