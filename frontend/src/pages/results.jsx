import { bitwiseSkinTypeToString } from "../../../shared/utils/constants";
import AuthPrompt from "../components/promptLogin";
import NavBar from "../components/navbar.jsx";
import ProductDetailsModal from "../components/productModal";
import { useUser } from "../hooks/useUser.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Results() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, loading: userLoading, error: userError } = useUser();

  useEffect(() => {
    // Early returns for authentication and loading states
    if (userLoading) return;
    if (userError) return;
    if (!user) navigate("/login");
    if (!user.skinType) navigate("/quiz");

    // Fetch recommendations
    const fetchRecommendations = async () => {
      try {
        // First, fetch user details
        const userResponse = await axios.get(`http://localhost:5001/api/user/${user.uid}`);
        
        // Then fetch recommendations using the user ID
        const recommendationsResponse = await axios.get(`http://localhost:5001/api/recommendation/${userResponse.data._id}`);

        // Check the structure of the response and handle accordingly
        const recommendationData = Array.isArray(recommendationsResponse.data) 
          ? recommendationsResponse.data 
          : recommendationsResponse.data.recommendations || [];

        setRecommendations(recommendationData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError(err);
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [user, navigate]);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
  };

  // Handle loading and error states
  if (userLoading) return <div>Loading user...</div>;
  if (userError) return <div>Error: {userError.message}</div>;
  if (error) return <div>Error fetching recommendations: {error.message}</div>;

  return (
    <div className="bg-gray-50 min-h-screen">
      <AuthPrompt />
      <NavBar user={user} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-center text-3xl font-bold mb-8 text-customBlue">
          You have {bitwiseSkinTypeToString(user.skinType)} skin!
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="col-span-full text-center">Loading recommendations...</div>
          ) : recommendations.length === 0 ? (
            <div className="col-span-full text-center text-gray-600">
              No recommendations found.
            </div>
          ) : (
            recommendations.map((product) => (
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
            ))
          )}
        </div>
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
  );
}

export default Results;