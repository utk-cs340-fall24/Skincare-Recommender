import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
  getUserByUID,
} from "../controllers/userController.js";

const router = express.Router();

// Create a new user
router.post("/register", createUser);

// Get a user by ID
router.get("/:userId", getUser);

// Update a user by ID
router.put("/:userId", updateUser);

// Delete a user by ID
router.delete("/:userId", deleteUser);

// Get a user by UID
router.get("/uid/:uid", getUserByUID);

export default router;
