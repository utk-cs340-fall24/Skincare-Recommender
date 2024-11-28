{ /* This is the profile modal. */ }

import React, { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { auth } from "../../firebase";

function ProfileModal({ isOpen, onClose }) {
  const [profile, setProfile] = useState(null);

  { /* Getting user information. */ }
  useEffect(() => {
    if (!isOpen) return;

    const getUserInfo = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const response = await axios.get(
              `http://localhost:5001/api/user/${user.uid}`
            );
            setProfile(response.data);
          } catch (error) {
            console.error("Error fetching user data:", error);
          }
        }
      });
    };

    getUserInfo();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background */}
      <div
        className="absolute inset-0 bg-customGray opacity-50"
        onClick={onClose}
      ></div>
      {/* Profile Modal */}
      <div className="bg-customBlue rounded-[30px] p-20 w-96 h-82 shadow-lg relative z-1">
        {/* Exit button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-customGray"
        >
          ✖️
        </button>
        <div className="flex flex-col items-center text-center">
          <div className="p-1 mb-1">
            <svg
              className="w-16 h-16 text-customGray"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v1h16v-1c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold">
            {profile ? profile.displayName : "User"}
          </h2>
          <p className="text-lg text-customGray">
            {profile ? profile.email : "email@gmail.com"}
          </p>
          <p className="text-lg text-customGray">
            Skin type:{" "}
            {profile && profile.skinType != 0 ? profile.skinType : "N/A"}
          </p>
          <p className="text-lg text-customGray">
            Skin concerns:{" "}
            {profile && profile.concerns != 0 ? profile.concerns : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ProfileModal;
