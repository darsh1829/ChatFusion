/**
 * @file Contacts.js
 * @description The file contains code for Contacts screen.  
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 1st February, 2024
 */
import React, { useContext, useEffect, useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { useContacts } from '../hooks/useHooks'
import GlobalContext from '../context/Context'
import { onSnapshot, collection, query, where } from '@firebase/firestore'
import { useRoute } from '@react-navigation/native'
import ListItem from '../components/ListItem'
import { db } from "../firebase";

export default function Contacts() {


  const contacts = useContacts()
  const route = useRoute()
  const image = route.params && route.params.image;
  return (


    <FlatList
      style={{ flex: 1, padding: 10 }}
      data={contacts}
      keyExtractor={(item) => item.email} // Assuming 'item.email' is unique
      renderItem={({ item }) => <ContactPreview contact={item} image={image} />}
    />

  )
}


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