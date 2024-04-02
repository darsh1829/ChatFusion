/**
 * @file Avatar.js
 * @description The files contains component to display an avatar image for a user of Chat Fusion
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 4th April, 2024
 */


import React from 'react'
import {Image} from 'react-native'

export default function Avatar({size, user}){
    return (
      <Image style={{
        width: size,
        height: size,
        borderRadius: size,
      }}
      source={user.photoURL ? {uri: user.photoURL} : require('../assets/icon-square.png')}
      resizeMode='cover'
      />
       
    )
}
