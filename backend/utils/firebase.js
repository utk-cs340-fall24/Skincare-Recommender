import admin from "firebase-admin";
import { config } from "dotenv";

export function initializeFirebase() {
  config();
  const firebaseAccountKey = process.env.FIREBASE_CREDENTIALS;
  if (!firebaseAccountKey) {
    console.error(
      "Error: Firebase service account key is not defined in the environment."
    );
    process.exit(1);
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert(JSON.parse(firebaseAccountKey)),
    });
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Firebase Admin:", error);
    process.exit(1);
  }
}
