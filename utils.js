/**
 * @file utils.js
 * @description The files contains comprehensive utility file for handling various functionalities related to image handling, text generation, and translation in a mobile application of Chat Fusion
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 4th April, 2024
 */
 
 import * as ImagePicker from "expo-image-picker";
 import "react-native-get-random-values";
 import { nanoid }from 'nanoid'
 import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
 import { storage } from "./firebase"
 
//Generate suggested text responses based on provided messages, aiming to provide one agreeing and one disagreeing response.
 export async function suggestText(messages,currentUser){
   let prompt = "Following is the message I received. I want you to act as a suggestive text generator and give me two different replies. One should be disagree with the message and other one agree with the message.\n"
   
   for(let i = messages.length-1; i >=0; i--){
     if(currentUser === messages[i].user._id){
       prompt += "Me: "
     }
     else{
       prompt += `${messages[i].user.name}: `
     }
     prompt += messages[i].text + "\n";
   }
   // Fetch suggestions using OpenAI API
   const apiKey = "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"; // Replace this with your OpenAI API key
   const url = "https://api.openai.com/v1/completions";
   const headers = {
       "Content-Type": "application/json",
       "Authorization": `Bearer ${apiKey}`
   };
   const body = JSON.stringify({
       model: "gpt-3.5-turbo-instruct",
       prompt,
       max_tokens: 150,
       temperature: 1.2,
       n: 2,
       stop: ["\n"]
   });
  
   try {
       const response = await fetch(url, {
           method: "POST",
           headers,
           body
       });
       // Extract and return suggested text completions
       const data = await response.json();
       const completions = data.choices.map(choice => choice.text.trim());
       return completions;
   } catch (error) {
       console.error("Error generating responses:", error);
       return [];
   }
 }

// Translates the provided text to the specified target language using the Google Translate API.
 export async function translateText (text, targetLanguage)  {
   const API_KEY =  "AIzaSyCsBaakDs4Y-hbWAuAhFBrO87EtPY3NAOg"
   const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
  
   const requestBody = {
     q: text,
     target: targetLanguage,
   };
  
   try {
    // Send request to Google Translate API
     const response = await fetch(url, {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(requestBody),
     });
     if (!response.ok) {
       throw new Error('Failed to translate text');
     }
    
     // Parse response and extract translations
     const data = await response.json();
     const translations = data.data.translations.map(translation => translation.translatedText);
     return translations[0];
   } catch (error) {
     console.error('Translation error:', error);
     return null;
   }
 };
  
 //Launches the device camera to capture an image for further use 
 export async function pickImage() {
   try {
     let result = await ImagePicker.launchCameraAsync({
       cameraType: ImagePicker.CameraType.front,
       aspect:[1,1],
       quality:1,
     });
     console.log(result); // Log the result
     return result;
   } catch (error) {
     console.error(error); // Log any errors
   }
 }  
  
//Requests permission from the user to access the device camera.
 export async function askForPermission() {
   const { status } = await ImagePicker.requestCameraPermissionsAsync();
   return status;
 }
  
 //Uploads an image to Firebase storage for storage and retrieval.
 export async function uploadImage(uri, path, fName) {
     // Why are we using XMLHttpRequest? See:
     // https://github.com/expo/expo/issues/2402#issuecomment-443726662
     const blob = await new Promise((resolve, reject) => {
       const xhr = new XMLHttpRequest();
       xhr.onload = function () {
         resolve(xhr.response);
       };
       xhr.onerror = function (e) {
         console.log(e);
         reject(new TypeError("Network request failed"));
       };
       xhr.responseType = "blob";
       xhr.open("GET", uri, true);
       xhr.send(null);
     });
  
     const fileName = fName || nanoid();
     const imageRef = ref(storage, `${path}/${fileName}.jpeg`);
  
     const snapshot = await uploadBytes(imageRef, blob, {
       contentType: "image/jpeg",
     });
  
     blob.close();
  
     const url = await getDownloadURL(snapshot.ref);
  
     return { url, fileName };
   }
  
 const palette = {
   tealGreen: "#378DFC",
   tealGreenDark: "rgb(79, 118, 255)",
   green: "#000000",
   lime: "#dcf8c6",
   skyblue: "#34b7f1",
   smokeWhite: "#ece5dd",
   white: "white",
   gray: "#3C3C3C",
   lightGray: "#757575",
   iconGray: "#717171",
 };

 //Defines the color palette and theme object used for styling the application.
 export const theme = {
  colors: {
    background: palette.smokeWhite,
    foreground: palette.tealGreenDark,
    primary: palette.tealGreen,
    tertiary: palette.lime,
    secondary: palette.green,
    white: palette.white,
    text: palette.gray,
    secondaryText: palette.lightGray,
    iconGray: palette.iconGray,
  },
};
