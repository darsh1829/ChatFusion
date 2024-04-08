import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authApp } from './firebase';

const auth = getAuth(authApp);

//sign up 
export const signUp = async (email, password, secretCode) => {
  try {
    const response = await fetch('/api/signupRoute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, secretCode }),
    });
    
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.error || 'Signup failed');
    }
    else{
      console.log("Attempting to sign up:", email, password);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      console.log("User created successfully:", userCredential.user);
      return await userCredential.user, response.json();;
    }
  } catch (error) {
    console.error("Error in signUp:", error);
    throw error;
  }
};


//sign in
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("User signed in successfully:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error("Error in signIn:", error);
    throw error;
  }
};
