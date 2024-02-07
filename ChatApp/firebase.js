/**
 * @file firebase.js
 * @description The files contains all the secrets of firebase which are used to access firebase services.
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 26th January, 2024
 */

import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

import {REACT_APP_FIREBASE_API_KEY, REACT_APP_FIREBASE_AUTH_DOMAIN, REACT_APP_FIREBASE_PROJECT_ID, REACT_APP_FIREBASE_STORAGE_BUCKET, REACT_APP_FIREBASE_MESSAGING_SENDER_ID, REACT_APP_FIREBASE_APP_ID,REACT_APP_FIREBASE_MEASUREMENT_ID} from "@env";

const firebaseConfig = {
  
    apiKey: REACT_APP_FIREBASE_API_KEY,
    authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: REACT_APP_FIREBASE_APP_ID,
    measurementId: REACT_APP_FIREBASE_MEASUREMENT_ID,

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

//Firebase util functions

//SignIn function for user authentication
export function signIn(email,password){
  return signInWithEmailAndPassword(auth, email, password)
}

//SignUp function for user authentication
export function signUp(email,password){
  return createUserWithEmailAndPassword(auth, email,password)
}