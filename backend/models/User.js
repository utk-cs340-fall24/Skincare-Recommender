import mongoose from "mongoose";
const { Schema, model } = mongoose;

// User model schema
const userSchema = new Schema({
  uid: {
    type: String, // Firebase's unique identifier for the user
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String, // Firebase display name
    required: false,
  },
  skinType: {
    type: Number, // Using bitwise operations to represent skin type
    required: false,
    default: 0, // Default to no skin type
  },
  concerns: {
    type: Number, // Using bitwise operations to represent skin concerns
    required: false,
    default: 0, // Default to no concerns
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = model("User", userSchema);
export default User;
