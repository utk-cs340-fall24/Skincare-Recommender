import React, { useEffect, useState } from "react";
import { auth } from "../../firebase"; // Adjust the import path as necessary
import { onAuthStateChanged } from "firebase/auth";

const UserInfo = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, retrieve user info
        setUserInfo({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "N/A",
          photoURL: user.photoURL || "N/A",
        });
      } else {
        // User is not signed in
        setUserInfo(null);
      }
      setLoading(false); // Set loading to false after checking auth state
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // Show loading indicator while checking user info
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">User Information</h2>
      {userInfo ? (
        <div className="bg-white shadow-md rounded-lg p-4">
          <p>
            <strong>User ID:</strong> {userInfo.uid}
          </p>
          <p>
            <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
            <strong>Display Name:</strong> {userInfo.displayName}
          </p>
          <p>
            <strong>Photo URL:</strong>{" "}
            <img
              src={userInfo.photoURL}
              alt="User Profile"
              className="w-24 h-24 rounded-full"
            />
          </p>
        </div>
      ) : (
        <p>No user is currently logged in.</p>
      )}
    </div>
  );
};

export default UserInfo;
