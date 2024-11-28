import User from "../models/User.js";
import mongoose from "mongoose";

// Create a new user
export const createUser = async (req, res) => {
  try {
    console.log("creating user");
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Determine if the `userId` is an ObjectId or a `uid`
    const query = mongoose.Types.ObjectId.isValid(userId)
      ? { _id: userId } // Search by `_id` if it's a valid ObjectId
      : { uid: userId }; // Otherwise, search by `uid`

    const user = await User.findOne(query);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a user by ID or UID
export const updateUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Determine if the `userId` is an ObjectId or a `uid`
    const query = mongoose.Types.ObjectId.isValid(userId)
      ? { _id: userId } // Search by `_id` if it's a valid ObjectId
      : { uid: userId }; // Otherwise, search by `uid`

    const user = await User.findOneAndUpdate(query, req.body, { new: true });

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a user by ID or UID
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // Determine if the `userId` is an ObjectId or a `uid`
    const query = mongoose.Types.ObjectId.isValid(userId)
      ? { _id: userId } // Search by `_id` if it's a valid ObjectId
      : { uid: userId }; // Otherwise, search by `uid`
    const user = await User.findOneAndDelete(query);

    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
