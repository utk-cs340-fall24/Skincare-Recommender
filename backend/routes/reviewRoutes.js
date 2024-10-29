import express from "express";
import {
  createReview,
  getReview,
  getProductReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// Create a new review
router.post("/", createReview);

// Get a single review by ID
router.get("/:reviewId", getReview);

// Get all reviews for a specific product
router.get("/product/:productId", getProductReviews);

// Update a review by ID
router.put("/:reviewId", updateReview);

// Delete a review by ID
router.delete("/:reviewId", deleteReview);

export default router;
