import React from "react"
import { Text, View } from "react-native"
import useContacts from "../hooks/useHooks"

export default function Contacts(){
    const contacts = useContacts()
    return(
        <View>
            <Text>{JSON.stringify(contacts)}</Text>
        </View>
    )
}