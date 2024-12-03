import React from "react";
import AuthPrompt from "../components/promptLogin";
import NavBar from "../components/navbar.jsx";
import { useUser } from "../hooks/useUser.jsx";

function Results() {
  const { user, loading, error } = useUser();
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <AuthPrompt />
      <NavBar user={user}/>
      <p>This is the results page</p>
      <p>Results:</p>
      {/* Conditionally render the results if they exist */}
      {user ? (
        <div>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>Skin Type: {user.skinType}</p>
          <p>Concerns: {user.concerns}</p>
          {/* You can map over any array if results contains arrays */}
          {user.skinConcerns && user.skinConcerns.length > 0 && (
            <div>
              <p>Skin Concerns:</p>
              <ul>
                {user.skinConcerns.map((concern, index) => (
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
