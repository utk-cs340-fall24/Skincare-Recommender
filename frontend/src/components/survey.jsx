import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { themeJson } from "../context/theme";
import { quizQuestions } from "../context/quizQuestions";
import { getAuth } from "firebase/auth";
import axios from "axios";
import { SKIN_TYPES, SKIN_CONCERNS } from "../../../shared/utils/constants.js";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook for redirection

// Helper function to build updated user data
function buildUpdatedUser(surveyData, user) {
  user.skinType = determineSkinType(surveyData);
  user.concerns = determineSkinConcerns(surveyData);
}

function determineSkinType(surveyData) {
  let skinType = 0;

  // Calculate skin type based on the user's response to question1
  if (surveyData.question1) {
    // If the user knows their skin type
    const skinTypes = surveyData.question2.map((val) => parseInt(val));
    skinType = skinTypes.reduce((acc, val) => acc | val, 0);
    console.log("Skin type:", skinType);
  } else {
    // If the user doesn't know their skin type
    const isDry = parseInt(surveyData.question3) ? SKIN_TYPES.DRY : 0;
    const isOily = parseInt(surveyData.question4) ? SKIN_TYPES.OILY : 0;
    const isSenitive = parseInt(surveyData.question5)
      ? SKIN_TYPES.SENSITIVE
      : 0;
    skinType = isDry | isOily | isSenitive;
    if (skinType === 0) skinType = SKIN_TYPES.NORMAL;
  }

  return skinType;
}

function determineSkinConcerns(surveyData) {
  let skinConcerns = 0;

  // Calculate skin concerns based on the user's response to question6
  if (surveyData.question6) {
    // If the user knows their skin concerns
    const concerns = surveyData.question7.map((val) => parseInt(val));
    skinConcerns = concerns.reduce((acc, val) => acc | val, 0);
  } else {
    // If the user doesn't know their skin concerns
    const isAcne = parseInt(surveyData.question8) ? SKIN_CONCERNS.ACNE : 0;
    const isAging = parseInt(surveyData.question9) ? SKIN_CONCERNS.AGING : 0;
    const isDryness = parseInt(surveyData.question10)
      ? SKIN_CONCERNS.DRYNESS
      : 0;
    const isRedness = parseInt(surveyData.question11)
      ? SKIN_CONCERNS.REDNESS
      : 0;
    const isHyperpigmentation = parseInt(surveyData.question12)
      ? SKIN_CONCERNS.HYPERPIGMENTATION
      : 0;
    const isPores = parseInt(surveyData.question13) ? SKIN_CONCERNS.PORES : 0;
    skinConcerns =
      isAcne | isAging | isDryness | isRedness | isHyperpigmentation | isPores;
  }

  return skinConcerns;
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
