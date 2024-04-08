/**
 * @file useHooks.js
 * @description The files contains Custom hook to fetch and display contacts from device of Chat Fusion
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 4th April, 2024
 */


import { useEffect, useState } from "react";
import { Text, View } from 'react-native';
import * as Contacts from "expo-contacts";

export function useContacts() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });
        if (data.length > 0) {
          setContacts(
            data
              .filter(
                (c) =>
                  c.firstName && c.emails && c.emails[0] && c.emails[0].email
              )
              .map(mapContactToUser)
          );
        }
      }
    })();
  }, []);
  return contacts;
}

function mapContactToUser(contact) {
  return {
    contactName:
      contact.firstName && contact.lastName
        ? `${contact.firstName} ${contact.lastName}`
        : contact.firstName,
    email: contact.emails[0].email,
  };
}

export function ContactsComponent() {
  const contacts = useContacts();

  return (
    <View>
      {contacts.map((user) => (
        <Text key={user.email}>
          {user.contactName}: {user.email}
        </Text>
      ))}
    </View>
  );
}
