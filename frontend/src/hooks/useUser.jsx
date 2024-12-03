import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";

export function useUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // User is authenticated
        try {
          const response = await axios.get(
            `http://localhost:5001/api/user/${firebaseUser.uid}`
          );
          setUser(response.data);  
          console.log("user fetched: ", response.data);
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError(error);
        }
      } else {
        // User is not authenticated
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup the subscription when the component is unmounted
    return () => unsubscribe();
  }, []);

  return { user, loading, error };
}
