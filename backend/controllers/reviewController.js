import Review from "../models/Review.js";

// Create a new review
export const createReview = async (req, res) => {
  try {
    const review = new Review(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a single review by ID
export const getReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId)
      .populate("userId", "name") // Optionally populate user details
      .populate("productId", "name"); // Optionally populate product details
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews for a specific product
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .populate("userId", "name") // Optionally populate user details
      .sort({ createdAt: -1 }); // Sort by creation date (newest first)
    res.json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a review by ID
export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.reviewId,
      req.body,
      { new: true }
    );
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a review by ID
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
