// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const config = import.meta.env;

const firebaseConfig = {
  apiKey: config.VITE_REACT_APP_apikey,
  authDomain: config.VITE_REACT_APP_authDomain,
  projectId: config.VITE_REACT_APP_projectId,
  storageBucket: config.VITE_REACT_APP_storageBucket,
  messagingSenderId: config.VITE_REACT_APP_messagingSenderId,
  appId: config.VITE_REACT_APP_appId,
  measurementId: config.VITE_REACT_APP_measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
