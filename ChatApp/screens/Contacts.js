import React, { useContext, useEffect, useState } from "react"
import { FlatList, Text, View } from "react-native"
import useContacts from "../hooks/useHooks"
import GlobalContext from "../Context/context"
import { collection, onSnapshot, query, where } from "@firebase/firestore"
import { db } from "../firebase"
import ListItem from "../components/ListItem"
import { useRoute } from "@react-navigation/native"

export default function Contacts(){
    const contacts = useContacts()
    const route = useRoute()
    const image = route.params && route.params.image
    
    return(
        <FlatList style={{flex: 1, padding:10}} data={contacts} keyExtractor={(_, i) => i}
            renderItem={(item)=> <ContactPreview contact={item} image={image}/>}
        />
    )
}

function ContactPreview({contact, image}){
    const {rooms} = useContext(GlobalContext)
    const [user,setUser] = useState(contact.item)
    useEffect(()=>{
        const q = query(
            collection(db, "users"),
            where("email", "==", contact.item.email)
        )
        
        const unsubscribe = onSnapshot(q, snapshot => {
            
            if(snapshot.docs.length){
                const userDoc = snapshot.docs[0].data()
                setUser((prevUser) => ({...prevUser, userDoc}))
                
            }
        })
        return () => unsubscribe();
    },[])

    return(
        <ListItem style={{marginTop: 7}} type="contacts" user={user} image={image} room={rooms.find(room => room.participantsArray.includes(contact.item.email))}/>
    )
}