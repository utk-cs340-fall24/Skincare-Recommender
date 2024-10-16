import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

// Create a new user
router.post("/", createUser);

// Get a user by ID
router.get("/:userId", getUser);

// Update a user by ID
router.put("/:userId", updateUser);

// Delete a user by ID
router.delete("/:userId", deleteUser);

export default router;
