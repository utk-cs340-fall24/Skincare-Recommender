{/* This is the survey Component. */}
import React from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { themeJson } from "../context/theme";
import { quizQuestions } from "../context/quizQuestions"; // Ensure this is imported correctly

// eslint-disable-next-line react/prop-types
function SurveyComponent({ onComplete }) {
    // Create a new survey model using quizQuestions
    const survey = new Model(quizQuestions);
    survey.applyTheme(themeJson);
    
    // Add an event listener for survey completion
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
        if (onComplete) {
            onComplete(sender.data);
        }
    });
    
    return <Survey model={survey} />;
}

export default SurveyComponent;
