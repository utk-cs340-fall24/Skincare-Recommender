import express from "express";
import { getRecommendations } from "../controllers/recommendationController.js";

const router = express.Router();

// Get recommendations for a specific user by user ID
router.get("/:userid", getRecommendations);

export default router;
