import React from "react";
import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import PrevProductButton from "./PrevProductButton";

function ProductDetailsModal({ product, onClose }) {
  // Function to generate star rating based on product rating
  function generateStarRating(rating) {
    const maxStars = 5;
    const filledStars = "★".repeat(Math.min(rating, maxStars));
    const emptyStars = "☆".repeat(maxStars - filledStars.length);
    return filledStars + emptyStars;
  }

  const [showMore, setShowMore] = useState(false);

  const max_ingredients = 8;

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  // Lock background scrolling when modal is opened
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div className="relative bg-customBlue rounded-lg p-8 shadow-lg w-full max-w-screen-md grid grid-rows-[1fr_auto] overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-customCream text-lg font-semibold opacity-75 hover:opacity-100 z-10"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Top Row: Image and Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="flex items-start justify-center">
            <img
              src={"./src/images/productplaceholder.png"}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="text-customCream">
            <h2 className="text-4xl font-semibold mb-4">{product.name}</h2>

            <p className="text-3xl mb-2">${product.price}</p>

            <p className="text-lg mb-2">{generateStarRating(product.rating)}</p>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2">Ingredients</h3>
              <div className="max-h-40 overflow-y-scroll overflow-x-hidden">
                <p className="text-lg inline">
                  {showMore
                    ? product.ingredients.join(", ")
                    : `${product.ingredients
                        .slice(0, max_ingredients)
                        .join(", ")}...`}{" "}
                </p>
                {product.ingredients.length > max_ingredients && (
                  <button
                    onClick={toggleShowMore}
                    className="text-customCream text-lg underline mt-2 inline"
                    aria-expanded={showMore}
                    aria-controls="ingredients-list"
                  >
                    {showMore ? "See Less" : "See More"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: PrevProductButton */}
        <div className="mt-6">
          <PrevProductButton
            className="w-full rounded-lg bg-gray-500 hover:bg-gray-200 text-customBlue text-lg font-semibold py-2 px-4"
            product={product}
          />
        </div>
      </div>
    </div>
  );
}

ProductDetailsModal.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ProductDetailsModal;
