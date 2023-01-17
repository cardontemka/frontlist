// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCAbo06be2uN5YcX7Frzk4IUnhEQO5qzcE",
  authDomain: "playlist-mock-87a03.firebaseapp.com",
  projectId: "playlist-mock-87a03",
  storageBucket: "playlist-mock-87a03.appspot.com",
  messagingSenderId: "259367587722",
  appId: "1:259367587722:web:b62cb217c2c4596f77c273",
  measurementId: "G-LX0555RZVE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Never Used