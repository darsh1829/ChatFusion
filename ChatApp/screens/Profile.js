/**
 * @file profile.js
 * @description This file includes a color palette and theme configuration for the
 *  ChatFusion application, providing a consistent look and feel across the app. 
 *  The theme object defined here is utilized throughout the application to ensure a cohesive design language.
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 3rd February, 2024
 */
import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, Button } from "react-native";
import  Constants  from "expo-constants";
import GlobalContext from "../Context/context";
import {StatusBar} from "expo-status-bar"
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { TextInput } from "react-native-gesture-handler";
import { pickImage, askForPermission } from "../utils";
export default function Profile(){

    const {theme: {colors}} = useContext(GlobalContext)
    const [displayName, setDisplayName] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [permissionStatus, setPermissionStatus] = useState(null)

    //Asks for permission for camera and library
    useEffect(() => {
        (async () =>{
            const status = await askForPermission();
            setPermissionStatus(status)
        })()
    }, [])

    function handlePress(){

    }
    //On click opens the camera for getting image
    async function handleProfilePicture(){
        const result = await pickImage()
        if(!result.canceled){
            setSelectedImage(result)
        }
    }
    //If permission is being pending
    if(!permissionStatus){
        return <Text>Loading</Text>
    }
    //Is permission is not granted
    if(permissionStatus !== "granted"){
        return <Text>You need to allow this permission</Text>
    }
    return(
        <React.Fragment>
            <StatusBar style="auto"/>
            <View 
                style={{ alignItems: "center", 
                justifyContent:"center", 
                flex: 1, 
                padding:20, 
                paddingTop: Constants.statusBarHeight + 20
            }}>
                {/*Renders Profile info text */}
                <Text style={{fontSize:22,color: colors.foreground}}>
                    Profile Info
                </Text>
                {/*Renders prompt*/}
                <Text style={{fontSize:14,color: colors.text,marginTop: 20}}>
                    Please provide your name and an optional profile photo
                </Text>
                {/*Renders camera-plus icon from MaterialCommunityIcon, renders the uploaded image once selected. Invokes the handleProfilePicture function*/}
                <TouchableOpacity 
                    onPress={handleProfilePicture}
                    style={{marginTop:30, borderRadius:120, width: 120, height:120, backgroundColor: colors.background, alignItems: "center", justifyContent:"center"}}
                >
                    {!selectedImage ? (<MaterialCommunityIcons name="camera-plus" color={colors.iconGray} size={45}/>) : <Image source={{uri:selectedImage}} style={{width:"100%", height:"100%",borderRadius: 120 }}/>}
                </TouchableOpacity>
                {/*Renders the input box for username */}
                <TextInput 
                    placeholder="Type your name" 
                    value={displayName} 
                    onChangeText={setDisplayName} 
                    style={{borderBottomColor: colors.primary, marginTop:40, borderBottomWidth:2, width: "100%"}}
                />
                {/*Renders the "Next Button*/}
                <View style={{marginTop: "auto", width: 80}}>
                    <Button title="Next" color={colors.secondary} onPress={handlePress} disabled={!displayName}/>
                </View>
            </View>
        </React.Fragment>
    )
}