import axios from "axios";
import { config } from "dotenv";

config();

// Define the base URL for the Python recommender service
const RECOMMENDER_API_URL =
  process.env.RECOMMENDER_API_URL || "http://127.0.0.1:5000/recommender";

// Get product recommendations for a given user
export const getRecommendations = async (req, res) => {
  const { userid } = req.params;

  try {
    // Make the request to the Python recommender service
    console.log(`${RECOMMENDER_API_URL}/${userid}`);
    const response = await axios.get(`${RECOMMENDER_API_URL}/${userid}`);

    // Check if the response contains the recommended products
    if (response.data && response.data.length > 0) {
      return res.json({
        userId: userid,
        recommendations: response.data,
      });
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
