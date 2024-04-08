/**
 * @file ContextWrapper.js
 * @description The files contains Wrapper component for providing context to the application of Chat Fusion
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 4th April, 2024
 */

import React, { useState } from "react";
import Context from "./Context";
import {theme} from "../utils";

export default function ContextWrapper(props){
    const [rooms, setRooms] = useState([])
    const [unfilteredRooms, setUnfilteredRooms] = useState([]);
    return(
        <Context.Provider value={{theme, rooms, setRooms, unfilteredRooms, setUnfilteredRooms}}>
        {props.children}
        </Context.Provider>
    );
}