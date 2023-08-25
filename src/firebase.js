// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOTBstnpULgEO9EUAIfOJQ8MYbCtXJun4",
  authDomain: "react-podcast-app.firebaseapp.com",
  projectId: "react-podcast-app",
  storageBucket: "react-podcast-app.appspot.com",
  messagingSenderId: "1069101797416",
  appId: "1:1069101797416:web:6a1b82b2f94650be7d651d",
  measurementId: "G-VDH2ZZDLCE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
const storage=getStorage(app);
const auth=getAuth(app);

export {auth,db,storage};
