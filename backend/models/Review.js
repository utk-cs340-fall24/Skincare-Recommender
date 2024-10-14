import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Review model schema
const reviewSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, // Minimum rating
    max: 5, // Maximum rating
  },
  comment: {
    type: String, // Optional comment
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Review = model("Review", reviewSchema);
export default Review;
