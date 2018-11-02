import { initializeApp } from "firebase/app";
import "firebase/database";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyAAY1HTcEhaBuuPA7qGcA1jy0oeiNcvpEA",
  authDomain: "spotty-vanilla.firebaseapp.com",
  databaseURL: "https://spotty-vanilla.firebaseio.com",
  projectId: "spotty-vanilla",
  storageBucket: "spotty-vanilla.appspot.com",
  messagingSenderId: "292173529673"
};

export const Firebase = initializeApp(config);
