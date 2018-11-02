import { initializeApp } from "firebase/app";
import "firebase/database";
import "firebase/storage";

import config from "../../config.sample.json";

export const FirebaseService = initializeApp(config);
