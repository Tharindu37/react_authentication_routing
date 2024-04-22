import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyAGFJVuRtrd0bH0um10XAf9E-SGOB5HEVc",
  authDomain: "reactauth-150fb.firebaseapp.com",
  projectId: "reactauth-150fb",
  storageBucket: "reactauth-150fb.appspot.com",
  messagingSenderId: "1018721134829",
  appId: "1:1018721134829:web:99fd0e13788429361084e4",
  measurementId: "G-YCKCB6EBQZ",
});

export const auth = getAuth(app);
export default app;
