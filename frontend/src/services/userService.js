import axios from "axios";

// Function to fetch user data using Firebase UID
export const getUserByUID = async (uid) => {
  try {
    const response = await axios.get(`http://localhost:5001/api/user/uid/${uid}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
