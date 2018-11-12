import { initializeApp } from "firebase/app";
import "firebase/database";
import "firebase/storage";
import "firebase/auth";

// eslint-disable-next-line import/no-unresolved
import config from "../../config.json";

export const FirebaseService = initializeApp(config);
