/**
 * @file ChatHeader.js
 * @description The file contains component to display the header of a chat, including the avatar and user name of Chat Fusion
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 4th April, 2024 */


import React, { useContext } from 'react'
import {View ,Text} from 'react-native'
import Avatar from './Avatar'
import {useRoute} from '@react-navigation/native'
import GlobalContext from '../context/Context';

export default function ChatHeader({size, user}){
    
    const route = useRoute();
    const {theme: {colors}} = useContext(GlobalContext)
    return (
      <View style={{flexDirection: "row"}}>
      
      <View>
      <Avatar size={40} user={route.params.user }/>
      </View>
       
       <View style={{marginLeft: 15, alignItems: "center", justifyContent: "center"}} >
        
        <Text
        style={{color: colors.white, fontSize: 18}}>
            {route.params.user.contactName || route.params.user.displayName}</Text>

       </View>

      </View>
       
    )
}