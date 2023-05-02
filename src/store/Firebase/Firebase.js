// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCSTkP00YgnCVcD8fmviKDxMME9go6Y10E",
  authDomain: "accessbank-c7361.firebaseapp.com",
  projectId: "accessbank-c7361",
  storageBucket: "accessbank-c7361.appspot.com",
  messagingSenderId: "1017817332911",
  appId: "1:1017817332911:web:1720e2e51fdb1f5029285a",
  measurementId: "G-4WNW20FFYS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
