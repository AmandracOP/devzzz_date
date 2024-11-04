// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics"; // Optional, remove if not needed

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_Zh3qOEAauYIdtzp_ela5HOUpWh5JfeY",
  authDomain: "movie-date-proposal.firebaseapp.com",
  projectId: "movie-date-proposal",
  storageBucket: "movie-date-proposal.firebasestorage.app",
  messagingSenderId: "321825808108",
  appId: "1:321825808108:web:de6fae98cf701c55128fc9",
  measurementId: "G-LLNHZRETTV"
};

// Initialize Firebase
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
