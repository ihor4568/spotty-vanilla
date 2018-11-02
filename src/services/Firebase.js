import { initializeApp } from "firebase/app";
import "firebase/database";
import "firebase/storage";

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
const config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  projectId: "<PROJECT_ID>",
  storageBucket: "<BUCKET>.appspot.com",
  messagingSenderId: "<SENDER_ID>"
};

export const Firebase = initializeApp(config);
