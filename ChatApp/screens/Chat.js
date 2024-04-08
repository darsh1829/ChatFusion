/**
 * @file Chat.js
 * @description The file contains code for Contacts screen.  
 * @author Ahmed Tazwar, Darsh Chirag Padaria, Darsh Vijaykumar Patel, Usama Sidat
 * @date 1st April, 2024
 */
import { useRoute } from '@react-navigation/native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, ImageBackground, TouchableOpacity, Image, Modal, StyleSheet, Pressable } from 'react-native'
import 'react-native-get-random-values'
import { nanoid } from 'nanoid';
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../firebase";
import GlobalContext from "../context/Context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { addDoc, collection, doc, onSnapshot, setDoc, updateDoc, serverTimestamp, getDoc } from "@firebase/firestore";
import { Actions, Bubble, GiftedChat, InputToolbar, } from "react-native-gifted-chat";
import { pickImage, uploadImage } from "../utils";
import ImageView from "react-native-image-viewing";
import { translateText } from '../utils';
import { suggestText } from '../utils';

export default function ChatHeader({ size, user }) {
  const [roomHash, setRoomHash] = useState("");
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalSuggestVisible, setModalSuggestVisible] = useState(false);
  const [modalJSX, setModalJSX] = useState("")
  const [selectedImageView, setSeletedImageView] = useState("");
  const [suggestiveTexts, setSuggestiveTexts] = useState([])


  const { theme: { colors } } = useContext(GlobalContext);
  const { currentUser } = auth
  const route = useRoute()
  const room = route.params.room
  const selectedImage = route.params.image
  const userB = route.params.user
  const randomId = nanoid();

  const senderUser = currentUser.photoURL
    ? { name: currentUser.displayName, _id: currentUser.uid, avatar: currentUser.photoURL }
    : { name: currentUser.displayName, _id: currentUser.uid };

  const roomId = room ? room.id : randomId

  const roomRef = doc(db, "rooms", roomId)

  const roomMessagesRef = collection(db, "rooms", roomId, "messages")

  const handleButtonPress = async (messageId, language) => {
    const updatedMessages = await Promise.all(messages.map(async (message) => {
      if (message._id === messageId) {
        if (language === "English") {
          try {
            const translatedText = await translateText(message.text, "en");
            return { ...message, text: translatedText };
          } catch (error) {
            console.error('Translation error:', error);
            return message;
          }
        }
        if (language === "Spanish") {
          try {
            const translatedText = await translateText(message.text, "es");
            return { ...message, text: translatedText };
          } catch (error) {
            console.error('Translation error:', error);
            return message;
          }
        }
        if (language === "French") {
          try {
            const translatedText = await translateText(message.text, "fr");
            return { ...message, text: translatedText };
          } catch (error) {
            console.error('Translation error:', error);
            return message;
          }
        }
      }
      return message;
    }));

    // Update the state with the new array of messages
    setMessages(updatedMessages);
  };
  const handleLightBulbPress = async () => {
    let texts = await new Promise((resolve, reject) => {
      // Process the map and splice operations
      const mappedTexts = messages.slice(0, 10).map(m => [m.text, m.user]);
      // Resolve the Promise with the resulting array
      resolve(mappedTexts);
    });
    texts = await suggestText(messages, currentUser.uid)
    texts = await new Promise((resolve, reject) => {
      const mappedTexts = texts.map(m => { const index = m.indexOf(":"); return m.substring(index + 1) });

      resolve(mappedTexts);
    });
    let modalValues = await new Promise((resolve, reject) => {
      const mappedTexts = texts.map((m, index) => { 
        return (
          <View key={`suggestion_${index}`} style={{ paddingVertical: 10 }}>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => sendSuggestive(m)}
            >
              <Text style={styles.textStyle}>{m}</Text>
            </Pressable>
          </View>
        );
      });
    
      resolve(mappedTexts);
    });
    setModalJSX(modalValues);    
    setModalSuggestVisible(true);
  }
  async function sendSuggestive(t) {
    const message = {
      _id: nanoid(),
      text: t,
      createdAt: new Date(),
      user: senderUser,
    };
    try {
      await addDoc(roomMessagesRef, message);
    } catch (error) {
      console.error('Error sending message:', error);
      // Handle error, if needed
    }
    setModalSuggestVisible(false)
  }
  
  useEffect(() => {
    (async () => {
      if (!room) {
        const currUserData = {
          displayName: currentUser.displayName,
          email: currentUser.email
        }
        if (currentUser.photoURL) {
          currUserData.photoURL = currentUser.photoURL
        }
        const userBData = {
          displayName: userB.contactName || userB.displayName || "",
          email: userB.email,
        };
        if (userB.photoURL) {
          userBData.photoURL = userB.photoURL;
        }
        const roomData = {
          participants: [currUserData, userBData],
          participantsArray: [currentUser.email, userB.email],
        };
        try {
          await setDoc(roomRef, roomData);
        } catch (error) {
          console.log(error);
        }
        const emailHash = `${currentUser.email}:${userB.email}`;
        setRoomHash(emailHash);
        if (selectedImage && selectedImage.uri) {
          await sendImage(selectedImage.uri, emailHash);
        }
      }
    })()
  }, [])

  useEffect(() => {
    const unsubscribe = onSnapshot(roomMessagesRef, (querySnapshot) => {
      const messagesFirestore = querySnapshot
        .docChanges()
        .filter(({ type }) => type === "added")
        .map(({ doc }) => {
          const message = doc.data();
          return { ...message, createdAt: message.createdAt ? message.createdAt.toDate() : new Date() };
        })
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      appendMessages(messagesFirestore);
    });
    return () => unsubscribe();
  }, []);

  const appendMessages = useCallback(
    (messages) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
    },
    [messages]
  );

  const onSend = useCallback(async (newMessages = []) => {
    // Get the last message from the array
    const lastMessage = newMessages[0];

    // Create or update the room with the last message
    const roomSnapshot = await getDoc(roomRef);
    if (!roomSnapshot.exists()) {
      await setDoc(roomRef, { lastMessage, createdAt: serverTimestamp() });
    } else {
      await updateDoc(roomRef, { lastMessage });
    }

    // Send the new messages
    for (let msg of newMessages) {
      await addDoc(roomMessagesRef, { ...msg, createdAt: serverTimestamp() });
    }

    // Update local state to immediately show new messages
    //setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages));

    console.log('All messages sent');
  }, [roomRef, roomMessagesRef]);

  const messageIdGenerator = () => {
    // Generate a unique ID for the message
    return Math.random().toString(36).substring(7);
  };
  

  return (
    <ImageBackground
      resizeMode="cover"
      source={require("../assets/chatbg.jpeg")}
      style={{ flex: 1 }}
    >
      <GiftedChat
        onSend={onSend}
        messages={messages}
        user={senderUser}
        renderAvatar={null}
        timeTextStyle={{ right: { color: colors.iconGray } }}
        renderSend={(props) => {
          const { text, user, onSend } = props;
          return (<>
            <TouchableOpacity
              onPress={handleLightBulbPress}
              style={{
                height: 40,
                width: 40,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5,
              }}
            >
              <MaterialCommunityIcons name="head-lightbulb-outline" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                height: 40,
                width: 40,
                borderRadius: 40,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 5,
              }}
              onPress={() => {
                if (text && onSend) {
                  onSend(
                    {
                      text: text.trim(),
                      user,
                      _id: messageIdGenerator(),
                    },
                    true
                  );
                }
              }}
            >

              <Ionicons name="send" size={20} color={colors.white} />
            </TouchableOpacity>
          </>
          );
        }}


        renderInputToolbar={(props) => (
          <InputToolbar
            {...props}
            containerStyle={{
              marginLeft: 10,
              marginRight: 10,
              marginBottom: 2,
              borderRadius: 20,
              paddingTop: 5,
            }}
          />
        )}

        renderBubble={props => {
          const { position, currentMessage } = props;
          return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {position === 'left' && <><Bubble {...props} />
                <TouchableOpacity
                  onPress={() => handleButtonPress(currentMessage._id, "Spanish")}
                  style={{
                    backgroundColor: 'gray',
                    borderRadius: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginHorizontal: 2,
                  }}
                >
                  <Text>Spa</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleButtonPress(currentMessage._id, "French")}
                  style={{
                    backgroundColor: 'gray',
                    borderRadius: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginHorizontal: 2,
                  }}
                >
                  <Text>Fr</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleButtonPress(currentMessage._id, "English")}
                  style={{
                    backgroundColor: 'gray',
                    borderRadius: 20,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    marginHorizontal: 2,
                  }}
                >
                  <Text>Eng</Text>
                </TouchableOpacity>
              </>
              }


              {position === 'right' && <Bubble {...props} textStyle={{ right: { color: colors.text } }} wrapperStyle={{ right: { backgroundColor: colors.tertiary } }} />}

            </View>
          );
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalSuggestVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalSuggestVisible(!modalSuggestVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {modalJSX}
            <View style={{ paddingVertical: 10 }}>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalSuggestVisible(false)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </ImageBackground>

  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});