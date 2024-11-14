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

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  function formatBrandName (brand) {
    return brand
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-customBlue rounded-lg p-8 shadow-lg max-w-screen-md max-h-[70vh] text-center overflow-scroll">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-customCream text-lg font-semibold opacity-75 hover:opacity-100"
        >
          ✕
        </button>

        <div className="flex space-x-6">
          {/* Product Image */}
          <div className="w-1/2 flex h-max items-start justify-center">
            <img
              src="./src/images/productplaceholder.png"
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
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
          {/* Product Info */}
          <div className="w-1/2 h-max text-customCream">
            <h2 className="text-4xl font-semibold mb-4">{product.name}</h2>

            <p className="text-3xl mb-2">${product.price}</p>

            <p className="text-lg mb-2">{generateStarRating(product.rating)}</p>

            <div className="mt-6">
              <h3 className="text-2xl font-semibold mb-2">Ingredients</h3>
              <div className="max-h-40 overflow-scroll">
                <p className="text-lg inline">
                  {showMore
                    ? product.ingredients.join(", ")
                    : `${product.ingredients.slice(0, 10).join(", ")}...`}
                </p>
                {product.ingredients.length > 9 && (
                  <button
                    onClick={toggleShowMore}
                    className="text-customCream text-lg underline mt-2 inline"
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
