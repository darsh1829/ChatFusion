import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import Context from '../context/Context';

export default function SignIn() {
  const {
    theme: {colors},
  } = useContext(Context);

    return (
    <View styles={{justifyContent: "center", alignItems: "center", flex: 1, backgroundColor: colors.white}}>
      <Text>SignIn</Text>
    </View>
  )
}