/**
 * @file SignIn.js
 * @description The files contains code to handle signIn/signUp functionality and signIn/signUp UI section of Chat Fusion
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 4th April, 2024
 */

import { View, Text, Image, Button, TouchableOpacity } from 'react-native';
import React, { useContext, useState } from 'react';
import Context from '../context/Context';
import { TextInput } from 'react-native-gesture-handler';
import { signIn,signUp } from '../firebase';

export default function SignIn() {

  const {
    theme: {colors},
  } = useContext(Context);


  const [email, setEmail] =useState("")
  const [password, setPassword] =useState("")
  const [mode, setMode] =useState("signUp")

  //function to handle signup and signin button
  async function handlePress() {
    if(mode === 'signUp') {
      await signUp(email, password)
    }
    if(mode === 'signIn'){
      await signIn(email,password)
    }
  }

    return (
    //signup and signin screen  
    <View style={{
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
      backgroundColor: colors.white
      }}>
      <Text style={{
        color: colors.foreground,
        fontSize:24,
        marginBottom:20
        }}>Welcome to ChatFusion!</Text>
        <Image source={require('../assets/welcome.png')} style={{width: 180, height:180}}
        resizeMode='cover'
        />

    <View style={{marginTop: 20}}>
   
     <TextInput 
      //Text Input for Email
      placeholder="Email"
      value={email}
      onChangeText={setEmail}
      style={{borderBottomColor: colors.primary,
      borderBottomWidth: 2,
      width: 200,}}
     />

     <TextInput 
      //Text Input for Password
      placeholder="Password"  
      value={password}
      onChangeText={setPassword}
      secureTextEntry={true}
      style={{borderBottomColor: colors.primary,
      borderBottomWidth: 2,
      width: 200,
      marginTop: 20}} 
      />
      
      <View style={{marginTop:20}}>
           
      <Button title={mode ==='signUp'? "Sign Up":  "Sign in"} 
      disabled={!password || !email}
      color={colors.secondary} 
       onPress={handlePress} />
      
      </View>

      <TouchableOpacity style={{marginTop:15 }} 
      onPress={()=>mode==='signUp'? setMode("signIn") :setMode("signUp")}>

        <Text style={{color: colors.secondaryText}}>{mode === 'signUp'
         ? "Already have an Account? Sign in":
         "Don't Have an Account? Sign up"}</Text>
      </TouchableOpacity>
    </View>
    </View>
  )
}