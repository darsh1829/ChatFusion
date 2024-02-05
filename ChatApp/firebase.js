//firebase.js implements all the database setup for ChatFusion
//
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from "firebase/firestore";

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
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

//Firebase util functions


export function signIn(email,password){
  return signInWithEmailAndPassword(auth, email, password)
}

export function signUp(email,password){
  return createUserWithEmailAndPassword(auth, email,password)
}