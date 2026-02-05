import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD9aY0njyOEyVjo2bj5vDLaXyJ-nSrib3I",
  authDomain: "gotlearning-bbf09.firebaseapp.com",
  projectId: "gotlearning-bbf09",
  storageBucket: "gotlearning-bbf09.firebasestorage.app",
  messagingSenderId: "83932658094",
  appId: "1:83932658094:web:1dbc8360b8acbc8ec1703f",
  measurementId: "G-1QC4MFJ1GG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
