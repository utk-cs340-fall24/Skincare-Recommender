{
  /* This is the quiz page. */
}
import "../../index.css";
import NavBar from "../components/navbar.jsx";
import AuthPrompt from "../components/promptLogin";
import SurveyComponent from "../components/survey.jsx";

function Quiz() {
  return (
    <>
      <NavBar />
      <AuthPrompt />
      <SurveyComponent />
    </>
  );
}
export default Quiz;
