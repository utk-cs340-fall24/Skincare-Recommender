{ /* This is the quiz page. */ }
import "../../index.css";
import NavBar from "../components/navbar.jsx";
import AuthPrompt from "../components/promptLogin";
import SurveyComponent from "../components/survey";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import { quizQuestions } from "../context/quizQuestions.js";


function Quiz() {
  const navigate = useNavigate();
  const [uid, setUid] = useState(null);

  // Retrieve Firebase UID and store it in the component state
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      setUid(user.uid);
    } else {
      // Redirect to login if no user is logged in
      navigate("/login");
    }
  }, [navigate]);

  // This function is called when the survey is completed
  const handleSurveyComplete = async (results) => {
    if (!uid) return;

    try {
        // Fetch user data by UID
        const { data: user } = await axios.get(`http://localhost:5001/api/user/uid/${uid}`);

        // Extract skinType and concerns from survey results
        const { question2: rawSkinType, question8: rawConcerns } = results || {};

        // Combine selected skin types using bitwise OR
        const skinType = rawSkinType
            ? rawSkinType.reduce((acc, type) => acc | Number(type), 0) // Bitwise OR for skin types
            : 0; // Default to 0 if no skin types are selected

        // Combine selected skin concerns using bitwise OR
        const concerns = rawConcerns
            ? rawConcerns.reduce((acc, concern) => acc | Number(concern), 0) // Bitwise OR for concerns
            : 0; // Default to 0 if no concerns are selected

        // Update user with survey results in the backend
        await axios.put(`http://localhost:5001/api/user/updateByUID/${user._id}`, {
            skinType,
            concerns,
        });  

        // Navigate to results page after successful update
        navigate("/results");
    } catch (error) {
        console.error("Error updating user profile:", error);
        alert("Failed to update user profile.");
    }
};


  return (
    <>
      <NavBar />
      <SurveyComponent onComplete={handleSurveyComplete} />
    </>
  );
};
export default Quiz;