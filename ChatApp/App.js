/**
 * @file App.js
 * @description The files is main file in the project and it contains main function which will be called every time project is started. 
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 26th January, 2024
 */

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
  
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const Stack = createStackNavigator();


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if(user){
        setCurrUser(user);
      }
    });
    return() => unsubscribe();
  }, [])

  if(loading){
    return <Text>Loading....</Text>
  }

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
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome.png")
  );
  if(!assets){
    return <Text>Loading ..</Text>;
  }
  return <ContextWrapper><App/></ContextWrapper>;
}

export default Main