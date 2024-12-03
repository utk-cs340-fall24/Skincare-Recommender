import { bitwiseSkinTypeToString } from "../../../shared/utils/constants";
import AuthPrompt from "../components/promptLogin";
import NavBar from "../components/navbar.jsx";
import ProductDetailsModal from "../components/productModal";
import { useUser } from "../hooks/useUser.jsx";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { RefreshCw } from 'lucide-react'; // Assuming you have lucide-react installed

function Results() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [previousProductRecommendations, setPreviousProductRecommendations] = useState({});
  const [productNames, setProductNames] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading: userLoading, error: userError } = useUser();

  const fetchRecommendations = useCallback(async () => {
    // Determine loading state based on whether this is an initial load or a refresh
    if (!isRefreshing) {
      setIsLoading(true);
    }
    setError(null);

    try {
      // First, fetch user details
      const userResponse = await axios.get(
        `http://localhost:5001/api/user/${user.uid}`
      );

      // Fetch recommendations using the user ID
      const recommendationsResponse = await axios.get(
        `http://localhost:5001/api/recommendation/${userResponse.data._id}`
      );

      // Check the structure of the response and handle accordingly
      const recommendationData = Array.isArray(recommendationsResponse.data)
        ? recommendationsResponse.data
        : recommendationsResponse.data.recommendations || [];

      setRecommendations(recommendationData);

      // Fetch recommendations for previous products
      const previousProductRecs = {};
      const productNameMap = {};

      for (const productId of userResponse.data.prevProducts || []) {
        try {
          // Fetch product name
          const productNameResponse = await axios.get(
            `http://localhost:5001/api/products/name/${productId}`
          );
          productNameMap[productId] = productNameResponse.data.name;

          // Fetch recommendations for the product
          const productRecsResponse = await axios.get(
            `http://localhost:5001/api/recommendation/products/${productId}`
          );

          // Extract similar products from the response
          const similarProducts =
            productRecsResponse.data.similarProducts || [];

          previousProductRecs[productId] = similarProducts;
        } catch (productRecError) {
          console.error(
            `Error fetching recommendations for product ${productId}:`,
            productRecError
          );
          previousProductRecs[productId] = [];
        }
      }

      setPreviousProductRecommendations(previousProductRecs);
      setProductNames(productNameMap);
      setIsLoading(false);
      setIsRefreshing(false);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setError(err);
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user, isRefreshing]);

  useEffect(() => {
    // Early returns for authentication and loading states
    if (userLoading) return;
    if (userError) return;
    if (!user) navigate("/login");
    if (!user.skinType) navigate("/quiz");

    fetchRecommendations();
  }, [user, navigate, fetchRecommendations, userLoading, userError]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchRecommendations();
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Render product grid
  const renderProductGrid = (products) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
          onClick={() => openModal(product)}
        >
          <div className="h-64 flex items-center justify-center mb-4">
            <img
              src="./src/images/productplaceholder.png"
              alt={product.name}
              className="max-h-full object-contain"
            />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-600">${product.price}</p>
            <div className="flex justify-center mt-2">
              {[...Array(Math.round(product.rating || 0))].map((_, i) => (
                <span key={i} className="text-yellow-500">
                  ★
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Handle loading and error states
  if (userLoading) return <div>Loading user...</div>;
  if (userError) return <div>Error: {userError.message}</div>;

  return (
    <>
      <AuthPrompt />
      <NavBar user={user} />

      <div className="mt-[60px] bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          {/* Skin Type Section with Refresh Button */}
          <div className="flex items-center justify-center mb-8">
            <h1 className="text-center text-3xl font-bold text-customBlue mr-4">
              You have {bitwiseSkinTypeToString(user.skinType)} skin!
            </h1>
            <button 
              onClick={handleRefresh} 
              disabled={isLoading || isRefreshing}
              className={`
                p-2 rounded-full 
                ${isLoading || isRefreshing 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-customBlue hover:bg-gray-200 transition-colors'}
              `}
              title="Refresh Recommendations"
            >
              <RefreshCw 
                className={isRefreshing ? 'animate-spin' : ''} 
                size={24} 
              />
            </button>
          </div>

          {/* Main Recommendations */}
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center text-customBlue">
              Recommended for You
            </h2>
            {isLoading ? (
              <div className="text-center">Loading recommendations...</div>
            ) : error ? (
              <div className="text-center text-red-600">
                Error fetching recommendations: {error.message}
              </div>
            ) : recommendations.length === 0 ? (
              <div className="text-center text-gray-600">
                No recommendations found.
              </div>
            ) : (
              renderProductGrid(recommendations)
            )}
          </section>

          {/* Previous Product Recommendations */}
          {Object.entries(previousProductRecommendations).map(
            ([productId, productRecommendations]) =>
              productRecommendations.length > 0 && (
                <section key={productId} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6 text-center text-customBlue">
                    Because You Liked {productNames[productId] || productId}
                  </h2>
                  {renderProductGrid(productRecommendations)}
                </section>
              )
          )}
        </div>

        {/* Product Details Modal */}
        {isModalOpen && selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            onClose={closeModal}
            user={user}
          />
        )}
      </div>
    </>
  );
}

export default Results;