import cors from "cors";
import express from "express";

const applyMiddleware = (app) => {
  app.use(cors()); // Enables CORS
  app.use(express.json()); // Parses incoming JSON requests
  app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.url}`);
    next();
  });
};

export default applyMiddleware;