// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_KEY}`,
  authDomain: "auth-react-43d8e.firebaseapp.com",
  projectId: "auth-react-43d8e",
  storageBucket: "auth-react-43d8e.appspot.com",
  messagingSenderId: "173647163964",
  appId: "1:173647163964:web:ba89ec6fd397a8e1838939",
  measurementId: "G-1Z8SSNDLNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth, provider}