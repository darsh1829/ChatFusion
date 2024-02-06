/**
 * @file utils.js
 * @description This file includes a color palette and theme configuration for the
 *  ChatFusion application, providing a consistent look and feel across the app. 
 *  The theme object defined here is utilized throughout the application to ensure a cohesive design language.
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 3rd February, 2024
 */


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
  
