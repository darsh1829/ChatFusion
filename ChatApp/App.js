import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, {useState, useEffect, LogBox} from 'react';
import {useAssets} from 'expo-asset'
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

LogBox.ignores([
  "Setting a timer",
  "AsyncStorage has been extracted from react-native core and will be removed in a future release.",
])
function App() {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);
  //
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false)
      if(user){
        setCurrUser(user);
      }
    });
    return() => unsubscribe();
  }, [])
  if(loading){
    return <Text>Loading....</Text>
  }
  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(currUser)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function Main(){
  const [assets] = useAssets(
    require("./assets/icon-square.png"),
    require("./assets/chatbg.png"),
    require("./assets/user-icon.png"),
    require("./assets/welcome.png")
  );
  if(!assets){
    return <Text>Loading ..</Text>;
  }
  return <App/>;
}

export default Main