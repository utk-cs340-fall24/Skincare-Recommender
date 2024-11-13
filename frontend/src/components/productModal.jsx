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

  function formatBrandName (brand) {
    return brand
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative bg-customBlue p-6 w-[800px] max-h-[65vh] rounded-lg shadow-md overflow-y-auto"
        style={{
          boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          color: 'customGray',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-[16px] right-[16px] w-[24px] h-[24px] p-[2px] opacity-50"
        >
          X
        </button>

        {/* Product Image on the Left */}
        <div className="float-left w-[300px] h-[450px] mr-6">
          <img
            src="./src/images/productplaceholder.png"
            alt={product.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Product Info on the Right */}
        <div className="text-customGray font-inclusive">
          {/* Product Title */}
          <h2 className="text-[36px] font-normal leading-[38px] mb-2">
            {product.name}
          </h2>
          <p className="text-[32px] font-normal leading-[36px] mb-2">
            by {formatBrandName(product.brand)}
          </p>
          {/* Price */}
          <p className="text-[32px] font-normal leading-[36px] mb-2">
            ${product.price}
          </p>

          {/* Rating */}
          <p className="text-[20px] font-normal leading-[24px] mb-2">
            {generateStarRating(product.rating)}
          </p>

          {/* Ingredients Header */}
          <p className="text-[24px] font-normal leading-[26px] mt-4 mb-1">
            Ingredients
          </p>

          {/* Scrollable Ingredients List */}
          <div className="max-h-[250px] overflow-y-auto pr-2 rounded-lg">
            <p className="text-[16px] font-normal leading-[24px]">
              {product.ingredients.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsModal;