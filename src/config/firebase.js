import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCYyyVYUHzT4dtro4hYCw9CCIdYWOwNtTQ",
  authDomain: "project-auth-8da35.firebaseapp.com",
  projectId: "project-auth-8da35",
  storageBucket: "project-auth-8da35.appspot.com",
  messagingSenderId: "1012470831613",
  appId: "1:1012470831613:web:3905e9e554ba96114c6194",
  measurementId: "G-GMD9LF3DX5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

export const auth = getAuth(app)
