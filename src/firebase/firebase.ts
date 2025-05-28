// src/firebase/firebase.ts
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCUuAJKVlwHyZZGTY_copK-i69cqenmwHs",
  authDomain: "vedalert-be8a1.firebaseapp.com",
  projectId: "vedalert-be8a1",
  storageBucket: "vedalert-be8a1.firebasestorage.app",
  messagingSenderId: "1077457917358",
  appId: "1:1077457917358:web:85dcddb0beba6ed4b7243f",
  measurementId: "G-X88PT295M2"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase analytics (optional)
const analytics = getAnalytics(app);

// Initialize Firebase Auth and export it
const auth = getAuth(app);

export { app, analytics, auth };
