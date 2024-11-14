{/* Pop up of prompt to login or create an account */}
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import Button from "./button";

const AuthPrompt = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check the authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setIsAuthenticated(true);
      } else {
        // User is not signed in
        setIsAuthenticated(false);
      }
      setLoading(false); // Set loading to false after checking auth state
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    !loading &&
    !isAuthenticated && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-hidden">
        <div className="bg-customBlue rounded-lg p-8 shadow-lg text-center">
          {/* Welcome text */}
          <h2 className="text-4xl text-customCream font-inknut font-semibold mb-4">
            Welcome!
          </h2>
          <div className="flex justify-center space-x-4">
            {/* Login button */}
            <Button
              label="Login"
              color="#F6CACB"
              activeColor="#DF9D9D"
              onClick={handleLogin}
            />
            {/* Sign up Button */}
            <Button
              label="Sign Up"
              color="#F6CACB"
              activeColor="#DF9D9D"
              onClick={handleSignup}
            />
          </div>
        </div>
      </div>
    )
  );
};

export default AuthPrompt;
