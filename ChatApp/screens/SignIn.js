import React, {useContext, useState} from 'react'
import {View, Text, Image, TextInput, Button, Platform} from 'react-native'
import Context from '../Context/context'
export default function SignIn(){
    const {theme: {colors}} = useContext(Context)
    return(
        <View style={{
            justifyContent: 'center', 
            alignItems:'center', 
            flex:1, 
            backgroundColor:colors.white
        }}>
            {/* Renders the Welcome Text*/}
            <Text style={{
                color: colors.foreground,
                fontSize:24,
                marginBottom:20}}>Welcome to ChatFusion</Text>
            {/* Renders the Logo
             TODO: Make it round*/}
            <Image
                source={require("../assets/welcome.png")}
                style={{ width:180, height:180}}
                resizeMode="cover"
            />
            {/* Renders Email and Password bars*/}
            <View style={{marginTop: 20}}>
                <TextInput placeholder="Email" 
                style={{
                    borderBottomColor: colors.primary,
                    borderBottomWidth:2,
                    width:200}}/>
                <TextInput placeholder="Password"
                secureTextEntry={true} 
                style={{
                    borderBottomColor: colors.primary,
                    borderBottomWidth:2,
                    width:200,
                    marginTop: 20
                    }}/>
            </View>
            {/* Renders the Sign Up button*/}
            <View style={{marginTop:20}}>
                <Button title="Sign Up" color={colors.secondary}/>
            </View>
        </View>
    )
}