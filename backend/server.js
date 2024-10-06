import express from 'express';
import { config } from 'dotenv'; // Load environment variables
import applyMiddleware from './middleware/middleware.js'; // Load custom middleware functions
import mongoose from 'mongoose'; // Mongoose for MongoDB object modeling

// Load environment variables (e.g., PORT, MONGO_URI)
config();

const app = express(); // Initialize Express app
const PORT = process.env.PORT || 5001; // Set server port (fallback to 5001)
const uri = process.env.MONGO_URI; // MongoDB connection string from .env

// Connect to MongoDB using Mongoose
async function connectToDatabase() {
  try {
    await mongoose.connect(uri)
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error); 
    process.exit(1); 
  }
}

// Apply middleware (CORS, JSON parsing, etc.)
applyMiddleware(app);

// Health check route
app.get('/', (req, res) => {
  res.send('Backend is running'); 
});

// Sample API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend!' }); 
});

// Start server and connect to database
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectToDatabase(); // Initiate MongoDB connection when server starts
});
