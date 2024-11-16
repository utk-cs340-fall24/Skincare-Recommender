{/* This is the survey Component. */}

import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { themeJson } from "../context/theme"
import { quizQuestions } from "../context/quizQuestions";

function SurveyComponent({ onComplete }) {
    const survey = new Model(quizQuestions);
    survey.applyTheme(themeJson);

    survey.onComplete.add(async (sender, options) => {
        const surveyData = sender.data;
        console.log(JSON.stringify(surveyData, null, 3));

        try {
            // Fetch the current user
            const user = firebase.auth().currentUser;
            if (!user) throw new Error("User not authenticated");

            const uid = user.uid;

            // get user by UID
            const response = await fetch(`http://localhost:5001/api/user/${uid}`);
            if (!response.ok) throw new Error("Failed to fetch user data");

            const userData = await response.json();

            // update user details with survey data
            const updateResponse = await fetch(`http://localhost:5001/api/user/${userData._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...userData,
                    skinType: surveyData.skinType, 
                    concerns: surveyData.concerns 
                })
            });

            if (!updateResponse.ok) throw new Error("Failed to update user");

            console.log("User successfully updated");

        } catch (error) {
            console.error("Error updating user:", error);
        }

        if (onComplete) {
            onComplete();
        }
    });

    return (<Survey model={survey} />);
}

export default SurveyComponent;