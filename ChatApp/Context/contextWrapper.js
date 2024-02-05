/**
 * @file ContextWrapper.js
 * @description This file defines a context wrapper component for the ChatFusion application. It uses the global context created in 'context.js' to provide the theme object to all components within the app. 
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 3rd February, 2024
 */

import React from "react";
import Context from './context';
import { theme } from "../ChatApp/utils";

export default function ContextWrapper(props){
    return(
        <Context.Provider value={{theme}}>
            {props.children}
        </Context.Provider>
    )
}