/**
 * @file firebase.js
 * @description The files contains all the secrets of firebase which are used to access firebase services.
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 4th April, 2024
 */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
import {getStorage} from "firebase/storage";
//import {getFirestore} from "firebase/firestore"; //use getFirestore if this doesnt work
import { initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
 
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCaXciTDYfYFiSVoJmPOzkkY1Vj8AKIV9A",
  authDomain: "chatfusion-9104b.firebaseapp.com",
  projectId: "chatfusion-9104b",
  storageBucket: "chatfusion-9104b.appspot.com",
  messagingSenderId: "446430013858",
  appId: "1:446430013858:web:c288dc23f775a764ee2afb",
  measurementId: "G-175DHFPCR6"
};
 
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
//export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage();
export const db = initializeFirestore(app , {
     experimentalForceLongPolling: true
 });

export function signIn(email,password ){
    return signInWithEmailAndPassword(auth, email, password)
}

export function signUp(email,password ){
    return createUserWithEmailAndPassword(auth, email, password)
}