//@refresh reset
import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { auth, db } from "../firebase";
import { useRoute } from "@react-navigation/native";
import { nanoid } from "nanoid";
import GlobalContext from "../Context/context";
import { collection, doc, setDoc } from "@firebase/firestore";

const randomId = nanoid()

export default function Chat(){
    const {theme: {colors}} = useContext(GlobalContext)
    const {currentUser} = auth
    const route = useRoute()
    const room = route.params.room
    const selectedImage = route.params.selectedImage
    const userB = route.params.userB

    const senderUser = currentUser.photoURL ? {name: currentUser.displayName, _id: currentUser.uid, avatar: currentUser.photoURL} : {name: currentUser.displayName, _id: currentUser.uid}

    const roomId = room ? room.id : randomId

    const roomRef = doc(db, "rooms", roomId)
    const roomMessageRef = collection(db, "rooms", roomId, "messages")
    console.log(userB)
    useEffect(() => {
        (async () => {
            if(!room){
                const currUserData ={
                    displayName: currentUser.displayName,
                    email: currentUser.email
                }
                if(currentUser.photoURL){
                    currUserData.photoURL = currentUser.photoURL
                }
                const userBData={
                    displayName: userB.contactName || userB.displayName || "",
                    email: currentUser.email
                }
                if(userB.photoURL){
                    userBData.photoURL = userB.photoURL
                }
                const roomData={
                    participants: [currUserData, userBData],
                    participantsArray:[currentUser.email, userB.email]
                }
                try{
                    await setDoc(roomRef, roomData)
                }
                catch(error){
                    console.log(error)
                }
            }
        })()
    })
    return(
        <View>
            <Text>Chat</Text>
        </View>
    )
}