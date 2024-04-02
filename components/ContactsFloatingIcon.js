/**
 * @file ContactsFloatingIcon.js
 * @description The file contains component for floating icon to navigate to contacts screen
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 4th April, 2024
 */

import React, { useContext } from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import GlobalContext from '../context/Context'
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function ContactsFloatingIcon(){

    const {theme: {colors}} = useContext(GlobalContext)
    const navigation = useNavigation()
    return (

       <TouchableOpacity
       onPress={() =>navigation.navigate("contacts")}
       style={{

        position: 'absolute',
        right: 20,
        bottom: 60,
        borderRadius: 60,
        width: 60,
        height: 60,
        backgroundColor:colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
       }}
       >
       {/* <MaterialCommunityIcons 
          name = "android-messages"
          size={30}
          color="white"
          style={{transform: [{scaleX: -1}]}}
       /> */}
       <AntDesign name="adduser" size={30} color="rgb(79, 118, 255)" style={{transform: [{scaleX: -1}]}}/>
       </TouchableOpacity>

    )
}