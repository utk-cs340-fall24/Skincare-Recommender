import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { themeJson } from "../context/theme";
import { quizQuestions } from "../context/quizQuestions";
import { getAuth } from "firebase/auth";
import axios from "axios";

function SurveyComponent() {
  const survey = new Model(quizQuestions);
  survey.applyTheme(themeJson);

  survey.onComplete.add(async (sender, /*options*/) => {
    const surveyData = sender.data;
    console.log("Survey Data:", JSON.stringify(surveyData, null, 3));

    try {
    //   // Get the current user from Firebase Authentication
    //   const auth = getAuth();
    //   const user = auth.currentUser;
    //   if (!user) throw new Error("User not authenticated");

    //   const uid = user.uid;
    //   console.log("User UID:", uid);

    //   // Directly send the PUT request to update user data
    //   const updateResponse = await axios.put(
    //     `http://localhost:5001/api/user/${uid}`,
    //     {
    //       skinType: surveyData.skinType,
    //       concerns: surveyData.concerns,
    //     },
    //     {
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   );

    //   console.log("User successfully updated:", updateResponse.data);
    console.log("Updating user");
    } catch (error) {
      console.error("Error updating user:", error);
    }

    // You can handle any additional logic here, like redirecting or showing a message
    console.log("Survey completed!");
  });

  return <Survey model={survey} />;
}

export default SurveyComponent;
