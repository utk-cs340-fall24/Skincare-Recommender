import express from "express";
import {
  getRecommendations,
  getSimilarProducts,
} from "../controllers/recommendationController.js";

const router = express.Router();

router.get("/products/:productid", getSimilarProducts);

// Get recommendations for a specific user by user ID
router.get("/:userid", getRecommendations);

export default router;
