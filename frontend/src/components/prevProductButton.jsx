import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { auth } from "../../firebase";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";

function PrevProductButton({ product, className = "" }) {
  const [isInHistory, setIsInHistory] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getUserInfo = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const response = await axios.get(
              `http://localhost:5001/api/user/${user.uid}`
            );
            
            // Check if the product is in prevProducts
            const isPrevProduct = response.data.prevProducts.some(
              (prevProduct) => prevProduct === product._id
            );
            
            setIsInHistory(isPrevProduct);
            setUserId(user.uid);
            setUserData(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      });
    };

    getUserInfo();
  }, [product._id]);

  const handleHistoryToggle = async () => {
    if (!userId || !userData) return;

    try {
      // Create a copy of the user data to modify
      const updatedUserData = { ...userData };

      // Modify prevProducts array
      if (isInHistory) {
        // Remove product from prevProducts
        updatedUserData.prevProducts = updatedUserData.prevProducts.filter(
          (prevProduct) => prevProduct !== product._id
        );
      } else {
        // Add product to prevProducts
        updatedUserData.prevProducts.push(product._id);
      }

      // Send PUT request with updated user data
      const updateResponse = await axios.put(
        `http://localhost:5001/api/user/${userId}`,
        updatedUserData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update local state
      setIsInHistory(!isInHistory);
      setUserData(updatedUserData);

      console.log("User successfully updated:", updateResponse.data);
    } catch (error) {
      console.error(`Error ${isInHistory ? 'removing' : 'adding'} product to history:`, error);
    }
  };

  return (
    <button 
      className={className}
      onClick={handleHistoryToggle}
    >
      {isInHistory ? "Remove from liked" : "Like this product"}
    </button>
  );
}

PrevProductButton.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }).isRequired,
  className: PropTypes.string,
};

export default PrevProductButton;