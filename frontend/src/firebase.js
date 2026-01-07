// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config (correct one)
const firebaseConfig = {
  apiKey: "AIzaSyCoQDZzF5jrTLKUR_zfXYfSc4Y5DjeolY0",
  authDomain: "advbulkmail.firebaseapp.com",
  projectId: "advbulkmail",
  storageBucket: "advbulkmail.firebasestorage.app",
  messagingSenderId: "603371841534",
  appId: "1:603371841534:web:30a89f84c291ce39a4c2af",
  measurementId: "G-FE8J12GYN7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase Authentication
export const auth = getAuth(app);

export default app;
