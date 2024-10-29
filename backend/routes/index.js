import userRoutes from "./userRoutes.js";
import productRoutes from "./productRoutes.js";
import reviewRoutes from "./reviewRoutes.js";
import ingredientRoutes from "./ingredientRoutes.js";

export default function setupRoutes(app) {
  app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
  });

  // Health check route
  app.get("/", (req, res) => {
    res.send("Backend is running");
  });

  // Sample API route
  app.get("/api/test", (req, res) => {
    console.log("Test route hit");
    res.json({ message: "Hello from the backend!" });
  });

  app.use("/api/user", userRoutes);
  app.use("/api/products", productRoutes);
  app.use("/api/reviews", reviewRoutes);
  app.use("/api/ingredients", ingredientRoutes);  
  // TODO: add routes recommendations

  // Catch-all route for debugging
  app.use((req, res) => {
    console.log("404 - Route not found:", req.method, req.url);
    res.status(404).json({ message: "Route not found" });
  });
}
