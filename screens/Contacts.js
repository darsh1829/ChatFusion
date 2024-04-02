/**
 * @file Contacts.js
 * @description The files contains code to handle contacts screen functionality of Chat Fusion
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 4th April, 2024
 */

import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList} from 'react-native'
import {useContacts} from '../hooks/useHooks'
import GlobalContext from '../context/Context'
import { onSnapshot, collection, query, where } from '@firebase/firestore'
import { useRoute } from '@react-navigation/native'
import ListItem from '../components/ListItem'
import { db } from "../firebase";

//Displays a list of contacts with optional images using FlatList in a React component
export default function Contacts(){

    const contacts = useContacts()
    const route = useRoute()
    const image = route.params && route.params.image; 
    return (

      <FlatList
      style={{ flex: 1, padding: 10 }}
      data={contacts}
      keyExtractor={(_, i) => i}
      renderItem={({ item }) => <ContactPreview contact={item} image={image} />}
    />
        
    )
}

//ContactPreview component that subscribes to user data changes in Firestore and updates state
function ContactPreview({ contact, image }) {
    const { unfilteredRooms, rooms } = useContext(GlobalContext);
    const [user, setUser] = useState(contact);
  
    useEffect(() => {
      const q = query(
        collection(db, "users"),
        where("email", "==", contact.email)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length) {
          const userDoc = snapshot.docs[0].data();
          setUser((prevUser) => ({ ...prevUser, userDoc }));
        }
      });
      return () => unsubscribe();
    }, []);

    //Returns a ListItem component for displaying contact details, including conditional room information
    return (
      <ListItem
      style={{ marginTop: 7 }}
      type="contacts"
      user={user}
      image={image}
      room={unfilteredRooms.find((room) =>
        room.participantsArray.includes(contact.email)
      )}
    />

    );
  }