import express from "express";
import { config } from "dotenv";

import applyMiddleware from "./middleware/middleware.js";
import setupRoutes from "./routes/index.js";
import { connectToDatabase, gracefulShutdown } from "./utils/database.js";

config();
const PORT = process.env.PORT || 5001;
const app = express();

// Apply middleware
applyMiddleware(app);

// Setup routes
setupRoutes(app);

// Start server
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
}
startServer();

// Graceful shutdown
process.on("SIGINT", gracefulShutdown);
