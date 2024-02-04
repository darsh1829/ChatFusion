
import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {useAssets} from "expo-asset";
import {onAuthStateChanged} from "firebase/auth";
import { auth, signIn } from './firebase';
import  {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import SignIn from "./screens/SignIn";
import ContextWrapper from './context/ContextWrapper';


const Stack = createStackNavigator();

function App() {
  const [currUser, setCurrUser] = useState(null)
  const [loading, setLoading] = useState(true)
  useEffect(()=> {
   const unsubscribe = onAuthStateChanged(auth, user => {
    setLoading(false)
    if(user){
      setCurrUser(user)
    }
   })
   return () => unsubscribe();
  }, [])

  if(loading){
    return <Text>Loading ...</Text>
  }

  return (
    <NavigationContainer>
      {!currUser ?(
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="signIn" component={SignIn} />
        </Stack.Navigator>
      ):<Text>Hi User! </Text>
         }
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Main(){
  const [assets] = useAssets(
    require("./assets/welcome.png"),
  );
  if(!assets) {
    return <Text>Loading ...</Text>;
  }
  return (
  <ContextWrapper>
  <App />
  </ContextWrapper> );
}

export default Main
