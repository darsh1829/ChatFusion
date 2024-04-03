// import React from 'react'
// import {View, Text, Button} from 'react-native'
// import  {useNavigation} from "@react-navigation/native";
// import {createStackNavigator} from "@react-navigation/stack";
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { AntDesign } from '@expo/vector-icons';

// const Stack = createStackNavigator();

// export default function Settings({}){
//     const navigation = useNavigation()
//     return (

//         <View>
//         {/* Other settings here */}
//        <TouchableOpacity
          
//           onPress={() => navigation.navigate("updateProfile")}  >

//           <AntDesign name="profile" size={24} color="black" />
//       </TouchableOpacity>
//       </View>
  
//     )
// }

// import React from 'react'
// import {View, Text, Button} from 'react-native'
// import  {useNavigation} from "@react-navigation/native";
// import {createStackNavigator} from "@react-navigation/stack";
// import { TouchableOpacity } from 'react-native-gesture-handler';
// import { AntDesign } from '@expo/vector-icons';

// const Stack = createStackNavigator();

// export default function Settings({}){
//     const navigation = useNavigation()
//     return (
//         <View>
//         {/* Other settings here */}
//        <TouchableOpacity
//           onPress={() => navigation.navigate('Settings', {
//               screen: 'NestedNavigatorName',
//               params: {
//                   screen: 'updateProfile',
//               },
//           })}  >
//           <AntDesign name="profile" size={24} color="black" />
//       </TouchableOpacity>
//       </View>
//     )
// }

import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import SignIn from "./SignIn";

export default function Settings({}){

    const navigation = useNavigation()

    const handleClick = () => {
      signOut(auth).then(() => {
        console.log("User Logged out");
        // Reset the navigation stack to the sign-in screen
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }],
        });
    }).catch((error) => {
        // Logging errors here
        console.error("Sign out error", error);
    });
    }
    
    return (
        <View>
        <Button
      title="Logout"
      onPress={handleClick}
    />
      
      </View>
    )
}



