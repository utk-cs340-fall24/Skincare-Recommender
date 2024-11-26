import PropTypes from "prop-types";
import { useState } from "react";
import "../../index.css";

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-customBlue rounded-lg p-8 shadow-lg w-full max-w-screen-md text-center overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-customCream text-lg font-semibold opacity-75 hover:opacity-100"
          aria-label="Close"
        >
          ✕
        </button>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex h-max items-start justify-center">
            <img
              src={product.image || "./src/images/productplaceholder.png"}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="w-full md:w-1/2 h-max text-customCream">
            <h2 className="text-4xl font-semibold mb-4">{product.name}</h2>

            <p className="text-3xl mb-2">${product.price}</p>

            <p className="text-lg mb-2">{generateStarRating(product.rating)}</p>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2">Ingredients</h3>
              <div className="max-h-40 overflow-y-scroll overflow-x-hidden">
                <p className="text-lg inline">
                  {showMore
                    ? product.ingredients.join(", ")
                    : `${product.ingredients.slice(0, max_ingredients).join(", ")}...`}{" "}
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
    image: PropTypes.string, // Added for dynamic image URL
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ProductDetailsModal;