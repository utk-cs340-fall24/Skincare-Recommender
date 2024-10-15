{
  /* This is the quiz page. */
}
import "../../index.css";
import NavBar from "../components/navbar.jsx";
import AuthPrompt from "../components/promptLogin";

function Quiz() {
  return (
    <>
      <NavBar />
      <AuthPrompt />
      <p>this is the quiz page</p>
    </>
  );
}
export default Quiz;
