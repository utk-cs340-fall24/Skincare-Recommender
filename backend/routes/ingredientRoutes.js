import express from "express";
import {
  createIngredient,
  getIngredient,
  getAllIngredients,
  updateIngredient,
  deleteIngredient,
} from "../controllers/ingredientController.js";

const router = express.Router();

// Create a new ingredient
router.post("/", createIngredient);

// Get a single ingredient by ID
router.get("/:ingredientId", getIngredient);

// Get all ingredients
router.get("/", getAllIngredients);

// Update an ingredient by ID
router.put("/:ingredientId", updateIngredient);

// Delete an ingredient by ID
router.delete("/:ingredientId", deleteIngredient);

export default router;
