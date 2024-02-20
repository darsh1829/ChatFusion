/**
 * @file utils.js
 * @description This file includes a color palette and theme configuration for the
 *  ChatFusion application, providing a consistent look and feel across the app. 
 *  The theme object defined here is utilized throughout the application to ensure a cohesive design language.
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 3rd February, 2024
 */

import * as ImagePicker from 'expo-image-picker'
import "react-native-get-random-values";
import { nanoid }from 'nanoid'
import {ref, uploadBytes, getDownloadURL} from 'firebase/storage'
import { storage } from "./firebase"

export async function pickImage(){
  let result = ImagePicker.launchCameraAsync();

  // let result = await ImagePicker.launchImageLibraryAsync({
  //   mediaTypes: ImagePicker.MediaTypeOptions.All,
  //   allowsEditing: true,
  //   aspect: [4, 3],
  //   quality: 1,
  // });
  return result;
}
export async function askForPermission(){
  const {status} = await ImagePicker.requestCameraPermissionsAsync();
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
    fusionBlue: "#217bff",
    fusionDarkBlue: "#1a5f99",
    fusionGreen: "#2ecc71",
    fusionLightGreen: "#a1e9c5",
    lightSkyBlue: "#74c0fc",
    softWhite: "#f7f7f7",
    pureWhite: "#ffffff",
    darkGray: "#4a4a4a",
    mediumGray: "#8e8e8e",
    iconGray: "#949494",
  };
  
  export const theme = {
    colors: {
      background: palette.softWhite,
      foreground: palette.fusionDarkBlue,
      primary: palette.fusionBlue,
      tertiary: palette.fusionLightGreen,
      secondary: palette.fusionGreen,
      white: palette.pureWhite,
      text: palette.darkGray,
      secondaryText: palette.mediumGray,
      iconGray: palette.iconGray,
    },
  };
  
