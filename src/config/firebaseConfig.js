// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLJMhKihi6DylNs1tipuCd1_WJ05vnrXY",
  authDomain: "the-original-dish.firebaseapp.com",
  projectId: "the-original-dish",
  storageBucket: "the-original-dish.appspot.com",
  messagingSenderId: "781663720742",
  appId: "1:781663720742:web:f9d5c5c68bc773d4209de7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth(app);
export const googleProvider = new GoogleAuthProvider();