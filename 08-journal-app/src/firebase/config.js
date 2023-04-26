// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8UsrUD1b9PA-5XvaGA-HFTUHSgqiA-Mg",
  authDomain: "react-journalapp-e156e.firebaseapp.com",
  projectId: "react-journalapp-e156e",
  storageBucket: "react-journalapp-e156e.appspot.com",
  messagingSenderId: "2649717277",
  appId: "1:2649717277:web:3ddab8b3f257f7d87a24f4"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth= getAuth(FirebaseApp);
export const FirebaseDB=getFirestore( FirebaseApp );