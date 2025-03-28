// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6fsKq5VBBibh5mbvk2y5cgD8Q20D5XoA",
  authDomain: "cattle-management-b7f9e.firebaseapp.com",
  projectId: "cattle-management-b7f9e",
  storageBucket: "cattle-management-b7f9e.firebasestorage.app",
  messagingSenderId: "960759294363",
  appId: "1:960759294363:web:63da55f190d91c4a13993e",
  measurementId: "G-LM98WR92Z3"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore
const db = getFirestore(app);

export { db };
