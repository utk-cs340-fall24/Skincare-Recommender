import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDPkSTmR28jzMny0fqDKpRADi0znQu_MbI",
  authDomain: "skincare-recommender-3a679.firebaseapp.com",
  projectId: "skincare-recommender-3a679",
  storageBucket: "skincare-recommender-3a679.appspot.com",
  messagingSenderId: "1039328606924",
  appId: "1:1039328606924:web:e0d24ddbc9457567fde069"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;