// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore/lite';
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp_mtKk7mNjTbaGGr0gbRITgED-wGfMAU",
  authDomain: "todos-4357c.firebaseapp.com",
  projectId: "todos-4357c",
  storageBucket: "todos-4357c.appspot.com",
  messagingSenderId: "1050943476528",
  appId: "1:1050943476528:web:07149f267d7b0778b1eef5",
  measurementId: "G-PTGXJPXKCT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const firestore = getFirestore(app)
const auth = getAuth(app)
// auth.languageCode = 'it';
export {firestore , auth}