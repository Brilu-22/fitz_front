// FitzFrontend/firebaseConfig.ts
import { initializeApp, getApps, getApp } from 'firebase/app';
// import { getAnalytics } from 'firebase/analytics'; // Optional, if you want analytics

// ** IMPORTANT: We are removing persistence for simplicity **
import { getAuth } from 'firebase/auth'; // Just getAuth, no initializeAuth or persistence-related imports
// No need for AsyncStorage or getReactNativePersistence imports anymore

import { getFirestore } from 'firebase/firestore'; // For accessing Firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5wj6es6Ac7z_hqgwEEFenGaoRgvbEoIY",
  authDomain: "calorie-app-c04e7.firebaseapp.com",
  projectId: "calorie-app-c04e7",
  storageBucket: "calorie-app-c04e7.firebasestorage.app",
  messagingSenderId: "699559097501",
  appId: "1:699559097501:web:3d0698373bf42dda9cd074",
  measurementId: "G-3MF8TM4C4R"
};

// Initialize Firebase only if no app has been initialized yet
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// const analytics = getAnalytics(app); // Optional

// Initialize Firebase services
// ** SIMPLIFIED AUTH INITIALIZATION WITHOUT PERSISTENCE **
export const auth = getAuth(app); // Use getAuth(app) directly

export const db = getFirestore(app);