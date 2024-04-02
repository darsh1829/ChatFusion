/**
 * @file App.js
 * @description The files is main file in the project and it contains main function which will be called every time project is started. 
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 4th April, 2024
 */

import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useContext} from "react";
import { StyleSheet, Text, View } from 'react-native';
import {useAssets} from "expo-asset";
import {onAuthStateChanged} from "firebase/auth";
import { auth } from './firebase';
import  {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import SignIn from "./screens/SignIn";
import ContextWrapper from './context/ContextWrapper';
import Context from './context/Context';
import Profile from './screens/profile';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chats from './screens/Chats'
import Settings from './screens/Settings'
import {Ionicons, MaterialCommunityIcons} from "@expo/vector-icons"
import Contacts from './screens/Contacts';
import Chat from './screens/Chat';
import ChatHeader from './components/ChatHeader';

const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();


function App() {
  const [currUser, setCurrUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const {theme: {colors}} = useContext(Context)
  
  //Tracks authentication state changes, updating current user and loading status
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
      ):(

        <Stack.Navigator
        screenOptions={{headerStyle: {
         backgroundColor: colors.foreground,
         shadowOpacity: 0,
         elevation: 0
        },
        headerTintColor: colors.white,

        }} >
          {!currUser.displayName && (
          <Stack.Screen 
          name="Profile"
          component={Profile} 
          options={{headerShown: false}} 
           />
          )}

          <Stack.Screen 
          name="home"
          options={{title: "Chat Fusion" , headerTitleAlign: 'center' }}
          component={Home}   
          />

          <Stack.Screen 
          name="contacts"
          options={{title: "Select Contacts" , headerBackTitle: null ,  headerTitleAlign: 'center' }}
          component={Contacts}
          />
        
        <Stack.Screen 
        name="chat"
        component={Chat}
        options={{headerTitle: (props) => <ChatHeader {...props}/>, headerBackTitle: null,  }}
        />

        </Stack.Navigator>
      )}
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

//Renders a tab navigation bar with custom icons and styles based on current theme
function Home(){
  const {theme: {colors}} = useContext(Context)
  return (
  <Tab.Navigator screenOptions={({route}) => {
    return {
      tabBarLabel: () =>{
        if(route.name === "chats"){
          return <Ionicons name = "chatbox-ellipses-outline" size={24} color={colors.white} />
        } else if (route.name === 'Settings'){
          return <Ionicons name = "settings" size={24} color={colors.white} />
        } else if (route.name === 'search'){
          return <MaterialCommunityIcons name="account-search" size={24} color={colors.white} />
        } 

      },
      tabBarShowIcon: true,
      tabBarLabelStyle: {
        color : colors.white
      },
      tabBarIndicatorStyle: {
        backgroundColor: colors.white
      },
      tabBarStyle: {
        backgroundColor: colors.foreground
      }
    }
  }}
  initialRouteName="chats"
  >
    
    <Tab.Screen name="chats" component={Chats}/>
    <Tab.Screen name="Settings" component={Settings}/>
  </Tab.Navigator>
  );
}

//Wraps the main application component (App).
function Main(){
  const [assets] = useAssets(
    require("./assets/welcome.png"),
  );
  if(!assets) {
    return <Text>Loading ...</Text>;
  }
  return <ContextWrapper>
  <App />
  </ContextWrapper> ;

  
}

export default Main