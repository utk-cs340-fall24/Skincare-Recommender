import React from 'react';
import "../../index.css";

function ProductDetailsModal({ product, onClose }) {
  // Function to generate star rating based on product rating
  function generateStarRating(rating) {
    const maxStars = 5;
    const filledStars = "★".repeat(Math.min(rating, maxStars));
    const emptyStars = "☆".repeat(maxStars - filledStars.length);
    return filledStars + emptyStars;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative bg-customBlue p-6 w-[670px] h-[549px] rounded-tl-[20px] shadow-md"
        style={{
          top: '186px',
          left: '305px',
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          color: 'customGray',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[16px] left-[16px] w-[24px] h-[24px] p-[2px] opacity-50"
        >
          X
        </button>

        {/* Product Image on the Left */}
        <div className="absolute top-[69px] left-[20px] w-[279px] h-[411px] flex items-center justify-center">
          <img
            src="./src/images/productplaceholder.png"
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Info on the Right */}
        <div className="absolute top-[80px] left-[340px] text-customGray font-inclusive">
          {/* Product Title */}
          <h2 className="text-[36px] font-normal leading-[43.2px] mb-2">
            {product.name}
          </h2>

          {/* Price */}
          <p className="text-[32px] font-normal leading-[38.4px] mb-2">
            ${product.price}
          </p>

          {/* Rating */}
          <p className="text-[20px] font-normal leading-[24px] mb-2">
            {generateStarRating(product.rating)}
          </p>

          {/* Ingredients Header */}
          <p className="text-[24px] font-normal leading-[28.8px] mt-4 mb-1">
            Ingredients
          </p>

          {/* Ingredients List */}
          <p className="text-[18px] font-normal leading-[28.8px]">
            {product.ingredients.join(', ')}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;