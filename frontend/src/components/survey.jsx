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
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
        if (onComplete) {
            onComplete();
        }
    });
    return (<Survey model={survey} />);
}

export default SurveyComponent;