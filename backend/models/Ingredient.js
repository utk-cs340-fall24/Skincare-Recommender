import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Ingredient model schema
const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true, // Ingredient name is required
    unique: true, // Ensuring each ingredient is unique
  }
});

const Ingredient = model("Ingredient", ingredientSchema);
export default Ingredient;
