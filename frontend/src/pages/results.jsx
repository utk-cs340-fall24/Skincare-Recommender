import { useLocation } from "react-router-dom";
import "../../index.css";
import AuthPrompt from "../components/promptLogin";
import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import { bitwiseSkinTypeToString } from "../../../shared/utils/constants";
import NavBar from "../components/navbar.jsx";
import { useUser } from "../hooks/useUser.jsx";

function Results() {
  // Access the results from location.state
  const location = useLocation();
  const results = location.state?.results; // Use optional chaining to avoid errors if results are undefined

  return (
    <>
      <AuthPrompt />
      <NavBar />
      <p>This is the results page</p>
      <p>Results:</p>
      {/* Conditionally render the results if they exist */}
      {results ? (
        <div>
          <p>Name: {results.displayName}</p>
          <p>Email: {results.email}</p>
          <p>Skin Type: {results.skinType}</p>
          <p>Concerns: {results.concerns}</p>
          {/* You can map over any array if results contains arrays */}
          {results.skinConcerns && results.skinConcerns.length > 0 && (
            <div>
              <p>Skin Concerns:</p>
              <ul>
                {results.skinConcerns.map((concern, index) => (
                  <li key={index}>{concern}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>No results available</p>
      )}
    </>
  );
}

export default Results;
