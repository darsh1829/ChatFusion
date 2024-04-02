/**
 * @file profile.js
 * @description The files contains code for profile section when use signup and they need to setup their profile. 
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 1st February, 2024
 */

import { View, Text, TouchableOpacity, Button, Image } from 'react-native'
import React, {useContext, useEffect, useState} from 'react'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import GlobalContext from '../context/Context'
import {MaterialCommunityIcons}from "@expo/vector-icons";
import { TextInput } from 'react-native-gesture-handler'
import {pickImage, askForPermission, uploadImage} from "../utils"
import {auth, db} from "../firebase"
import { updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'

export default function profile() {
    const [displayName, setDisplayName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [permissionStatus,setPermissionStatus ] = useState(null)
    const navigation = useNavigation()

    useEffect(() => {
      (async ()=> {
        const status = await askForPermission();
        setPermissionStatus(status);
      })()
    }, [])

    const {theme: {colors}} = useContext(GlobalContext);
  //Asynchronously handles press action by uploading a profile picture if selected and updating user profile and database, then navigates to home
   async function handlePress() {
     const user = auth.currentUser
     let photoURL
     if(selectedImage){
     const {url} = await uploadImage(selectedImage, `images/${user.uid}`, "profilePicture");
     photoURL = url;
     }

     const userData = {
      displayName,
      email: user.email,

     }
     if(photoURL){
      userData.photoURL = photoURL
     }

     await Promise.all([
      updateProfile(user, userData),
      setDoc(doc(db, "users", user.uid),{...userData, uid: user.uid})
     ])
   
     navigation.navigate("home")

  }

  const saveImage = async(selectedImage) => {
    try{
    setSelectedImage(selectedImage);
    //setModalVisible(flase);
    }
    catch (error){
     throw error;
    }
  }

  
   async function handleProfilePicture() {
    const result = await pickImage()
    if(!result.canceled){
      await saveImage(result.assets[0].uri);
     }
    }

    if(!permissionStatus){
    return (<Text>Loading</Text>)
  }
    
    if(permissionStatus !== "granted"){
      return (<Text>You need to allow this permission</Text>)
  }
  
  //screen includes a status bar, a title, an instruction text, a touchable area for a profile picture, a text input for entering a name, and a "Next" button.
  return (
    <React.Fragment>
        <StatusBar style="auto" />
      <View style={{
        alignItems: "center", 
        justifyContent: "center", 
        flex:1, 
        paddingTop: Constants.statusBarHeight + 20,
        padding: 20
        }}>
        
        <Text 
        style={{fontSize:22 , 
        color: colors.text, 
        
        }}>Profile Info</Text>

         <Text 
        style={{fontSize:14 , 
        color: colors.text, 
        marginTop: 20
        }}>Please Provide your name and an optional profile photo</Text>


        <TouchableOpacity 
            onPress={handleProfilePicture}
            style={{
            marginTop: 20, 
            borderRadius: 120, 
            width: 120,
            height:120,
            backgroundColor: colors.background,
            alignItems: 'center',
            justifyContent: 'center'
            }}>

           {!selectedImage ? (<MaterialCommunityIcons 
           name="camera-plus" 
           color={colors.iconGray}
           size={45} />): ( 
           
           <Image 
           source={{uri: selectedImage}}
           style={{width: "100%", height: "100%", borderRadius: 120}}
           />   )}
        
        </TouchableOpacity>
        
        <TextInput 
        placeholder='Type Your name' 
        value={displayName} 
        onChangeText={setDisplayName}
        style={{
          borderBottomColor: colors.primary, 
          marginTop: 40, 
          borderBottomWidth: 2, 
          width: "100%"
        }} />

        <View
        style={{marginTop: "auto",
        width: 80
        }}
        >
         <Button 
         title="Next"
         color={colors.secondary}
         onPress={handlePress}
         disabled={!displayName}
         /> 
      
        </View>

        </View>
    </React.Fragment>
  );
}