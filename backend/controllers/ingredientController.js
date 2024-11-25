import Ingredient from "../models/Ingredient.js";

// Create a new ingredient
export const createIngredient = async (req, res) => {
  try {
    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single ingredient by ID
export const getIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.ingredientId);
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });
    res.json(ingredient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all ingredients
export const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update an ingredient by ID
export const updateIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.ingredientId,
      req.body,
      { new: true }
    );
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });
    res.json(ingredient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete an ingredient by ID
export const deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(
      req.params.ingredientId
    );
    if (!ingredient)
      return res.status(404).json({ message: "Ingredient not found" });
    res.json({ message: "Ingredient deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
