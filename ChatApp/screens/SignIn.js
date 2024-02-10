/**
 * @file SignIn.js
 * @description The files contains code to handle signin functionality and signin UI section of Chat Fusion
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 26th January, 2024
 */

import React, {useContext, useState, useEffect} from 'react'
import {View, Text, Image, TextInput, Button, Platform, Alert} from 'react-native'
import Context from '../Context/context'
import { signIn, signUp } from '../firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'

export default function SignIn(){
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [mode,setMode] = useState("signUp")
    const [refreshKey, setRefreshKey] = useState(0) //state initialised with a default value of refreshkey as 0
    const [error, setError] = useState(""); 

    //Importing color themes
    const {theme: {colors}} = useContext(Context)

    /*Using useEffect hook to increment the value by 1 everytime the email or password field is updated
    This is done because everytime the key prop is updated in react, it forces the page to re render, so that the enable and disable functionality displays accurately in the UI*/
    useEffect(() => {
        setRefreshKey(prevKey => prevKey + 1);
    }, [email, password])

    //Handles the sign up button
    async function handlePress(){
        setError("");

        try {
            if(mode === 'signUp'){
                await signUp(email,password)
            }
            if(mode === 'signIn'){
                await signIn(email,password)
            }
        } catch (err){
            //Added the checks for error display
            if (err.code === 'auth/invalid-email') {
                setError("Invalid email format.");
            } else if (err.code === 'auth/user-disabled') {
                setError("This user has been disabled.");
            } else if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
                setError("Invalid email or password.");
            } else if (err.code === 'auth/email-already-in-use') {
                setError("Email is already in use.");
            } else if (err.code === 'auth/weak-password') {
                setError("Password is too weak.");
            } else {
                setError("An error occurred, please try again.");
            }
        }
    
    }
    return(
        <View style={{
            justifyContent: 'center', 
            alignItems:'center', 
            flex:1, 
            backgroundColor:colors.white
        }}>
            {/* Renders the Welcome Text*/}
            <Text 
            style={{
                color: colors.foreground,
                fontSize: 30, 
                marginBottom: 30, 
                fontWeight: 'bold', 
                textAlign: 'center', 
                letterSpacing: 1,
            }}
            >
            Welcome to ChatFusion
            </Text>
                
            {/* Renders the Logo*/}
            <Image
                source={require("../assets/welcome.png")}
                style={{
                    width:180, height:180
            }}
                resizeMode="cover"
            />

            {/* Renders Email and Password bars*/}
            <View style={{marginTop: 20, width: '70%', alignSelf: 'center'}}>
                <TextInput 
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail} 
                    style={{
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 2,
                        fontSize: 14,
                        paddingVertical: 10,
                        paddingHorizontal: 5,
                        marginBottom: 10,
                        width: '100%' 
                    }}
                />
                <TextInput 
                    placeholder="Password"
                    secureTextEntry={true} 
                    value={password}
                    onChangeText={setPassword} 
                    style={{
                        borderBottomColor: colors.primary,
                        borderBottomWidth: 2,
                        fontSize: 14,
                        paddingVertical: 10,
                        paddingHorizontal: 5,
                        marginTop: 10,
                        width: '100%' 
                    }}
                />
            </View>


            {/* Renders the Sign Up/Log in button depending on the mode*/}
            <TouchableOpacity
                key={refreshKey} // Used refreshKey here to force re-render as explained above in the useEffect hook
                onPress={handlePress}
                style={[
                    {
                        backgroundColor: colors.secondary,
                        padding: 10,
                        borderRadius: 5,
                        width: 200,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: 20,
                    },
                    !(email.length > 0 && password.length > 0) ? { opacity: 0.5 } : {}
                ]}
                disabled={!(email.length > 0 && password.length > 0)}
            >
                <Text style={{
                    color: colors.white
                    }}>
                        {mode === "signUp" ? "Sign Up" : "Log in"}
                </Text>
            </TouchableOpacity>

            {/*Renders a pressable line of text which changes mode to from Sign In to Log In */}
            <TouchableOpacity 
                style={{
                    marginTop: 15
                }} 
                onPress={()=>mode === 'signUp' ? setMode('signIn') : setMode("signUp")}
            >
                <Text>{mode === "signUp" 
                        ? "Already have an account? Sign in" 
                        : "Don't Have an account? Sign Up"}
                </Text>
            </TouchableOpacity>

            {/* Error message display */}
            {error ? (
                <Text style={{
                    color: 'red',
                    marginBottom: 20, 
                    marginTop: 10
                }}>
                    {error}
                </Text>
            ) : null}

        </View>
    )
}