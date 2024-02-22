import { collection, onSnapshot, query, where } from "@firebase/firestore";
import React, { useContext, useEffect } from "react";
import { Text, View } from "react-native";
import { auth, db } from "../firebase";
import GlobalContext from "../Context/context";
import ContactsFloatingIcon from "../components/ContactsFloatingIcon";
import ListItem from "../components/ListItem";
import useContacts from "../hooks/useHooks";

export default function Chats(){
    const {currentUser} = auth
    const {rooms, setRooms} = useContext(GlobalContext)
    const contacts = useContacts()
    const chatsQuery = query(
        collection(db, "rooms"),
        where("participantsArray", "array-contains", currentUser.email)
    )
    useEffect(() => {
        const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
            const parsedChats = querySnapshot.docs.filter(
                (doc) => doc.data().lastMessage
            ).map((doc) =>({
                ...doc.data(),
                id: doc.id,
                userB: doc.data().participants.find(p => p.email !== currentUser.email)
            }))
            setRooms(parsedChats)
        });
        return () => unsubscribe();
    },[])
    function getUserB(user,contacts){
        const userContact = contacts.find((c) => c.email === user.email);
        if(userContact && userContact.contactName){
            return {...user,contactName}
        }
        return user;
    }
    return(<View style={{flex: 1, padding:5, paddingRight: 10}}>
            {rooms.map((room) => 
                            <ListItem 
                                type="chat" 
                                description={room.lastMessage.text} 
                                key={room.id} 
                                room={room} 
                                time={room.lastMessage.createdAt} 
                                user={getUserB(chat.userB, contacts)}/>
            )}
            <ContactsFloatingIcon/>
        </View>)
}