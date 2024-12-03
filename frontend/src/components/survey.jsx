import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import { themeJson } from "../config/theme";
import { quizQuestions } from "../config/quizQuestions";
import axios from "axios";
import { SKIN_TYPES, SKIN_CONCERNS } from "../../../shared/utils/constants.js";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function determineSkinType(surveyData) {
  let skinType = 0;

  if (surveyData.question1) {
    const skinTypes = surveyData.question2.map((val) => parseInt(val));
    skinType = skinTypes.reduce((acc, val) => acc | val, 0);
  } else {
    const isDry = parseInt(surveyData.question3) ? SKIN_TYPES.DRY : 0;
    const isOily = parseInt(surveyData.question4) ? SKIN_TYPES.OILY : 0;
    const isSenitive = parseInt(surveyData.question5) ? SKIN_TYPES.SENSITIVE : 0;
    skinType = isDry | isOily | isSenitive;
    if (skinType === 0) skinType = SKIN_TYPES.NORMAL;
  }

  return skinType;
}

function determineSkinConcerns(surveyData) {
  let skinConcerns = 0;

  if (surveyData.question6) {
    const concerns = surveyData.question7.map((val) => parseInt(val));
    skinConcerns = concerns.reduce((acc, val) => acc | val, 0);
  } else {
    const isAcne = parseInt(surveyData.question8) ? SKIN_CONCERNS.ACNE : 0;
    const isAging = parseInt(surveyData.question9) ? SKIN_CONCERNS.AGING : 0;
    const isDryness = parseInt(surveyData.question10) ? SKIN_CONCERNS.DRYNESS : 0;
    const isRedness = parseInt(surveyData.question11) ? SKIN_CONCERNS.REDNESS : 0;
    const isHyperpigmentation = parseInt(surveyData.question12) ? SKIN_CONCERNS.HYPERPIGMENTATION : 0;
    const isPores = parseInt(surveyData.question13) ? SKIN_CONCERNS.PORES : 0;
    skinConcerns = isAcne | isAging | isDryness | isRedness | isHyperpigmentation | isPores;
  }

  return skinConcerns;
}

function SurveyComponent({ user }) {
  const navigate = useNavigate();

  const survey = new Model(quizQuestions);
  survey.applyTheme(themeJson);

  survey.onComplete.add(async (sender) => {
    const surveyData = sender.data;

    try {
      // Update the user's skin type and concerns
      user.skinType = determineSkinType(surveyData);
      user.concerns = determineSkinConcerns(surveyData);
      user.quizTaken = true;

      // Send the updated user data to the server
      await axios.put(
        `http://localhost:5001/api/user/${user.uid}`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Navigate to results page with updated user data
      navigate("/results", { state: { results: user } });
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response ? error.response.data : error.message
      );
    }
  });

  return <Survey model={survey} />;
}
SurveyComponent.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    skinType: PropTypes.number,
    concerns: PropTypes.number,
    quizTaken: PropTypes.bool,
  }).isRequired,
};

export default SurveyComponent;