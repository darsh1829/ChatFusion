/**
 * @file App.js
 * @description The files is main file in the project and it contains main function which will be called every time project is started. 
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 26th January, 2024
 */

//Import all the necessary components from React-Native, Firebase, Expo, react-navigation.
import { Text, View } from 'react-native';
import React, {useState, useEffect, LogBox} from 'react';
import {useAssets} from 'expo-asset'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './screens/SignIn';
import ContextWrapper from './Context/contextWrapper';

function App() {
  //State variables to track user and loading status
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //Create Stack navigator instance
  const Stack = createStackNavigator();
  
  //use effect to listen for authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false) //Set loading to false when state is determined
      if(user){
        setCurrUser(user);// Update current user if signed in
      }
    });
    // Clean up subscription on unmount. When unsubscribing from the
    // Firebase authentication, state updates when the component unmounts
    // to prevent memory leaks and unexpected behavior
    return() => unsubscribe();
  }, [])

  //During the loading process between two screens render loading message
  if(loading){
    return <Text>Loading....</Text>
  }

  // Conditionally render sign-in or greeting based on user state
  return (
    <NavigationContainer>
      {!currUser ?
       (
        <Stack.Navigator screenOptions={{headerShown:false}}>
          <Stack.Screen name = "signIn" component ={SignIn}/>
        </Stack.Navigator>
      )
       : <Text>Hi User!</Text>}
    </NavigationContainer>
  );
}


function Main(){
  //Load required assets
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome.png")
  );

  //During the loading process between two screens render loading message
  if(!assets){
    return <Text>Loading ..</Text>;
  }

  // Wrap the App component within the ContextWrapper
  return <ContextWrapper><App/></ContextWrapper>;
}

//Export the Main function as the default export for this module.
export default Main