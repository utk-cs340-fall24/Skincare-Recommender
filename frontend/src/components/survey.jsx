import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { themeJson } from "../context/theme";
import { quizQuestions } from "../context/quizQuestions";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { SKIN_TYPES } from "../../../shared/utils/constants.js";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for redirection

// Helper function to build updated user data
function buildUpdatedUser(surveyData, user) {
  let skinType = 0;
  let skinConcerns = 0;

  // Calculate skin type based on the user's response to question2
  if (surveyData.question1) {
    const skinTypes = surveyData.question2.map((val) => parseInt(val));
    skinType = skinTypes.reduce((acc, val) => acc | val, 0); // Use OR to accumulate skin types
  } else {
    const isOily = parseInt(surveyData.question3) ? SKIN_TYPES.OILY : 0;
    const hasLargePores = parseInt(surveyData.question4) ? SKIN_TYPES.PORES : 0;
    const isTightFlaky = parseInt(surveyData.question5) ? SKIN_TYPES.DRY : 0;
    const isDull = parseInt(surveyData.question6) ? SKIN_TYPES.NORMAL : 0;
    const isSenitive = parseInt(surveyData.question7)
      ? SKIN_TYPES.SENSITIVE
      : 0;

    skinType = isOily | hasLargePores | isTightFlaky | isDull | isSenitive;
    if (skinType === 0) skinType = SKIN_TYPES.NORMAL;
  }

  // Calculate skin concerns based on the user's response to question8
  const concerns = surveyData.question8
    ? surveyData.question8.map((val) => parseInt(val))
    : [];
  skinConcerns = concerns.reduce((acc, val) => acc | val, 0); // Use OR to accumulate concerns
  user.skinType = skinType;
  user.concerns = skinConcerns;
  console.log("Updated user:", user);
}

function SurveyComponent() {
  const survey = new Model(quizQuestions);
  survey.applyTheme(themeJson);

  const navigate = useNavigate();

  survey.onComplete.add(async (sender /*options*/) => {
    const surveyData = sender.data;

    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");
      const uid = user.uid;

      // Fetch the current user data
      const updatedUser = await axios.get(
        `http://localhost:5001/api/user/${uid}`
      );

      // Update the user data with survey responses
      buildUpdatedUser(surveyData, updatedUser.data);

      // Send the updated user data to the server
      const updateResponse = await axios.put(
        `http://localhost:5001/api/user/${uid}`,
        updatedUser.data, // Send the updated user data
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("User successfully updated:", updateResponse.data);

      // Redirect to the results page, passing the updated user as state
      navigate("/results", { state: { results: updatedUser.data } });

    } catch (error) {
      console.error(
        "Error updating user:",
        error.response ? error.response.data : error.message
      );
    }

    console.log("Survey completed!");
  });

  return <Survey model={survey} />;
}

export default SurveyComponent;
