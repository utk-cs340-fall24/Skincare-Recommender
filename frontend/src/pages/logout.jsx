{ /* This is the logout page. */ }
import React, { useEffect, useState } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";

const Logout = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true); // Start with loading as true
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // User is signed in
      } else {
        setIsAuthenticated(false); // No user is signed in
        setMessage("No user signed in.");
      }
      setLoading(false); // Set loading to false after checking auth state
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    if (loading) return; // Prevent logout if still loading

    setLoading(true);
    signOut(auth)
      .then(() => {
        // Sign-out successful
        setMessage("Signed out successfully!");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened
        setMessage("Error signing out.");
        console.error("Error signing out: ", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // Call handleLogout if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      handleLogout();
    }
  }, [isAuthenticated]);

  return (
    !loading && (
      <>
        <div className="bg-customCream h-screen flex items-center justify-center">
          <h1 className="text-customBlue text-4xl font-bold font-inknut">{message}</h1>{" "}
        </div>
      </>
    )
  );
};

export default Logout;
