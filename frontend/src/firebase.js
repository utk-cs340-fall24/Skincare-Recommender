// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPkSTmR28jzMny0fqDKpRADi0znQu_MbI",
  authDomain: "skincare-recommender-3a679.firebaseapp.com",
  projectId: "skincare-recommender-3a679",
  storageBucket: "skincare-recommender-3a679.appspot.com",
  messagingSenderId: "1039328606924",
  appId: "1:1039328606924:web:e0d24ddbc9457567fde069"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;