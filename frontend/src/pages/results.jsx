import { useState, useEffect } from "react";
import AuthPrompt from "../components/promptLogin";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { bitwiseSkinTypeToString } from "../../../shared/utils/constants";
import NavBar from "../components/navbar.jsx";

function Results() {
  const [userSkinType, setUserSkinType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getUserInfo = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const response = await axios.get(
              `http://localhost:5001/api/user/${user.uid}`
            );
            console.log("User data:", response.data);

            // Assuming the user's skin type is in the response data
            setUserSkinType(response.data.skinType);
            setIsLoading(false);
          } catch (error) {
            console.error("Error fetching user data:", error);
            setIsLoading(false);
          }
        } else {
          setIsLoading(false);
        }
      });
    };

    getUserInfo();
  }, []);

  return (
    <>
      <AuthPrompt />
      <NavBar />
      <div className="container mx-auto mt-10 text-center">
        {isLoading ? (
          <p>Loading...</p>
        ) : userSkinType ? (
          <h1 className="text-customBlue text-4xl font-bold font-inknut">
            You have {bitwiseSkinTypeToString(userSkinType)} skin!
          </h1>
        ) : (
          <p>No skin type found</p>
        )}
      </div>
    </>
  );
}

export default Results;
