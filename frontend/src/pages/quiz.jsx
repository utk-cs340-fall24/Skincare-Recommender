{ /* This is the quiz page. */ }
import "../../index.css";
import NavBar from "../components/navbar.jsx";
import AuthPrompt from "../components/promptLogin";
import SurveyComponent from "../components/survey";
import { useNavigate } from "react-router-dom";

function Quiz() {
  const navigate = useNavigate();

  {/* This navigates to the results page when the quiz has been completed */}
  const handleSurveyComplete = () => {
    navigate("/results");
  };

  return (
    <>
      <NavBar />
      <AuthPrompt />
      <SurveyComponent onComplete={handleSurveyComplete} />
    </>
  );
}
export default Quiz;
