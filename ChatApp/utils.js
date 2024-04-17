/**
 * @file utils.js
 * @description N/A
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 26th March, 2024
 */

import * as ImagePicker from "expo-image-picker";
import "react-native-get-random-values";
import { nanoid } from 'nanoid'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from "./firebase"
const he = require('he');

export async function suggestText(messages, currentUser) {
  let prompt = "Below is a message I received. Please act as a human-like suggestive text generator and create two replies. The first reply should sound like a natural, casual disagreement with the message, expressing a negative viewpoint as if a friend is responding. The second reply should sound supportive and positive, agreeing with the message as if a friend is agreeing. Make sure both responses feel natural and conversational. Here is the message:\n"
 
  for (let i = messages.length - 1; i >= 0; i--) {
    if (currentUser === messages[i].user._id) {
      prompt += "Me: "
    } else {
      prompt += `${messages[i].user.name}: `
    }
    prompt += messages[i].text + "\n";
  }
  console.log(prompt);
  const apiKey = "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"; // Ensure this key is securely stored in practice
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };
  const body = JSON.stringify({
    model: "gpt-4",
    messages: [{role: "system", content: prompt}],
    max_tokens: 150,
    temperature: 0.7,
    n: 1
  });
 
  try {
    const response = await fetch(url, {
      method: "POST",
      headers,
      body
    });
    const data = await response.json();
 
    if (data.choices) {
      const replies = data.choices[0].message.content.split('\n');
      const filteredReplies = replies.filter(reply => reply.trim() !== '');
      const completion = [filteredReplies[1],filteredReplies[3]];
      return completion;
    }
    return [];
  } catch (error) {
    console.error("Error generating responses:", error);
    return [];
  }
}

export async function translateText(text, targetLanguage) {
  const API_KEY = "AIzaSyCsBaakDs4Y-hbWAuAhFBrO87EtPY3NAOg";
  const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

  const requestBody = {
      q: text,
      target: targetLanguage,
  };

  try {
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

      const data = await response.json();
      const translations = data.data.translations.map(translation => he.decode(translation.translatedText));
      console.log(data.data.translations)
      return translations[0];
  } catch (error) {
      console.error('Translation error:', error);
      return null;
  }
};


export async function pickImage() {
  try {
    let result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.front,
      aspect: [1, 1],
      quality: 1,
    });
    console.log(result); // Log the result
    return result;
  } catch (error) {
    console.error(error); // Log any errors
  }
}


export async function askForPermission() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  return status;
}

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