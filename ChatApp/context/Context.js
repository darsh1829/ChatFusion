/**
 * @file Context.js
 * @description The files contains Global context for managing application-wide state and theme of Chat Fusion
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 4th April, 2024
 */

import { theme } from "../utils";
import React from 'react'

const GlobalContext = React.createContext({
  theme,
  rooms: [],
  setRooms: () => {},
  unfilteredRooms: [],
  setUnfilteredRooms: () => {}
});


export default GlobalContext;
