import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import Context from '../context/Context';

export default function SignIn() {

  const {
    theme:{ colors },
  } = useContext(Context);
  return (
    <View 
    style={{
      justifyContent: "center",
      alignItems:"center",
      flex:1,
      backgroundColor: colors.white
    }}>
      <Text
      style={{
        color: colors.foreground,
        fontSize:24,
        marginBottom:20
      }}>
        Welcome to ChatFusion!
      </Text>
    </View>
  );
}

