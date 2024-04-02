/**
 * @file Chats.js
 * @description The files contains code to fetch chat rooms data from Firebase Firestore based on the current user's participation of Chat Fusion and display them.
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 4th April, 2024
 */

import {  collection, onSnapshot, query, where } from 'firebase/firestore'
import React, {useContext, useEffect} from 'react'
import {View, Text} from 'react-native'
import GlobalContext from '../context/Context'
import {auth, db} from "../firebase"
import ContactsFloatingIcon from '../components/ContactsFloatingIcon'
import ListItem from '../components/ListItem'
import {useContacts} from "../hooks/useHooks";
import { ImageBackground } from 'react-native';

export default function Chats(){
    const {currentUser} = auth;
    const {rooms, setRooms, setUnfilteredRooms } = useContext(GlobalContext);
    const contacts = useContacts()
    //Constructs a Firestore query to fetch chat rooms containing the current user
    const chatsQuery = query(
        collection(db, "rooms"),
        where("participantsArray", "array-contains", currentUser.email)
      );
    //
   useEffect(() => {
      const unsubscribe = onSnapshot(chatsQuery, (querySnapshot) => {
        //Maps Firestore querySnapshot to an array of chat data, identifying the chat partner for the current user
        const parsedChats = querySnapshot.docs.map((doc) => ({
          ...doc.data(), //creating a shallow copy of the document's data.
          id: doc.id,
          
          //This line extracts the userB property from the Firestore document (doc) by finding the participant whose email does not 
          //match the current user's email within the participants array, effectively identifying the chat partner for the current user.
          userB: doc
            .data()
            .participants.find((p) => p.email !== currentUser.email),
        }));
        setUnfilteredRooms(parsedChats); //update the component's state with the data retrieved from Firestore.
        
        //Help to get chat rooms with recent activity (last message) are included in the rooms state.
        setRooms(parsedChats.filter((doc) => doc.lastMessage));
      });
      return () => unsubscribe();
    }, []);
    
    //Enriches user data with contact name if available
     function getUserB(user, contacts) {
      const userContact = contacts.find((c) => c.email === user.email);
      if(userContact && userContact.contactName) {
         return{...user, contactName: userContact.contactName}
      }
      return user;
     }

    return (

       <View style={{flex:1, paddingRight:10}}>
        {rooms.map((room)=><ListItem  
        type="chat"
        description={room.lastMessage.text}
        key={room.id} 
        room={room}
        time={room.lastMessage.createdAt}
        user={getUserB(room.userB, contacts)}
        />)}
        <ContactsFloatingIcon />
       </View>
   
    )
}