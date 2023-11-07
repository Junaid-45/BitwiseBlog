// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { config } from "../config/config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: config.firebaseAPIKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.senderId,
  appId: config.appid,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
