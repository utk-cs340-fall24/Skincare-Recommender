import express from "express";
import {
  createProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Create a new product
router.post("/", createProduct);

// Get a single product by ID
router.get("/:productId", getProduct);

// Get all products
router.get("/", getAllProducts);

// Update a product by ID
router.put("/:productId", updateProduct);

// Delete a product by ID
router.delete("/:productId", deleteProduct);

export default router;
