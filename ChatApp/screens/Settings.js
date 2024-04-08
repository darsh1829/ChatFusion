/**
 * @file Settings.js
 * @description The file contains code for Contacts screen.  
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 1st April, 2024
 */
import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import SignIn from "./SignIn";

export default function Settings({ }) {

  const navigation = useNavigation()

  const handleClick = () => {
    signOut(auth).then(() => {
      console.log("User Logged out");
      navigation.reset({
        index: 0,
        routes: [{ name: 'signIn' }],
      });
    }).catch((error) => {
      // Logging errors here
      console.error("Sign out error", error);
    });
  }

  return (
    <View>
      <Button
        title="Logout"
        onPress={handleClick}
      />

    </View>
  )
}