import mongoose from "mongoose";
import { config } from "dotenv";

config();
const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("Error: MONGO_URI is not defined in the environment.");
  process.exit(1);
}

export async function connectToDatabase() {
  try {
    await mongoose.connect(uri);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export async function gracefulShutdown() {
  console.log("Shutting down server...");
  await mongoose.disconnect();
  console.log("MongoDB disconnected");
  process.exit(0);
}
