import React, {useContext} from 'react'
import {View, Text} from 'react-native'
import Context from '../Context/context'
export default function SignIn(){
    const {theme: {colors}} = useContext(Context)
    return(
        <View style={{justifyContent: 'center', alignItems:'center', flex:1, backgroundColor:colors.white}}>
            <Text>Sign In</Text>
        </View>
    )
}