/**
 * @file context.js
 * @description This file creates a global context for the ChatFusion application using React's context API. It exports a context that includes the theme, allowing for theme customization and consistent access to theme properties throughout the application components.
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 3rd February, 2024
 */

import React from "react";
import { theme } from "../utils";

const GlobalContext = React.createContext({
    theme
})

export default GlobalContext;