import React from "react";
import NavBar from "../components/navbar.jsx";
import AuthPrompt from "../components/promptLogin";
import SurveyComponent from "../components/survey";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

function Quiz() {
  const navigate = useNavigate();

  const { user, loading, error } = useUser();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const handleSurveyComplete = () => {
    navigate("/results");
  };

  return (
    <>
      <NavBar user={user} />
      <AuthPrompt />
      <div className="bg-customCream min-h-screen pt-[60px]">
        <SurveyComponent onComplete={handleSurveyComplete} user={user} />
      </div>
    </>
  );
}
export default Quiz;
