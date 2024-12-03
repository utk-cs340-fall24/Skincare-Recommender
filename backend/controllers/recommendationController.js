import axios from "axios";
import { config } from "dotenv";
import Product from "../models/Product.js";

config();

// Define the base URL for the Python recommender service
const RECOMMENDER_API_URL =
  process.env.RECOMMENDER_API_URL || "http://127.0.0.1:5000/recommender";

// Get product recommendations for a given user
export const getRecommendations = async (req, res) => {
  const { userid } = req.params;

  try {
    // Make the request to the Python recommender service
    const response = await axios.get(`${RECOMMENDER_API_URL}/${userid}`);

    // Check if the response contains the recommended products
    if (response.data && response.data.length > 0) {
      // Use Promise.all to resolve all product lookups
      const products = await Promise.all(
        response.data.map(async (productId) => {
          return Product.findById(productId);
        })
      );
      return res.json(products);
    } else {
      return res
        .status(404)
        .json({ message: "No recommendations found for this user." });
    }
  } catch (error) {
    console.error("Error while fetching recommendations:", error);
    return res.status(500).json({ message: "Error fetching recommendations." });
  }
};

export const getSimilarProducts = async (req, res) => {
  const { productid } = req.params;

  try {
    const response = await axios.get(
      `${RECOMMENDER_API_URL}/similar/${productid}`
    );

    if (response.data && response.data.length > 0) {
      const similarProducts = await Promise.all(
        response.data.map(async (similarProductId) => {
          return Product.findById(similarProductId);
        })
      );

      return res.json(similarProducts);
    } else {
      return res
        .status(404)
        .json({ message: "No similar products found for this product." });
    }
  } catch (error) {
    console.error("Error while fetching similar products:", error);
    return res
      .status(500)
      .json({ message: "Error fetching similar products." });
  }
};
