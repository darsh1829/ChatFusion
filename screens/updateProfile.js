import { View, Text, TouchableOpacity, Button, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import Constants from 'expo-constants'
import GlobalContext from '../context/Context'
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TextInput } from 'react-native-gesture-handler'
import { pickImage, askForPermission, uploadImage } from "../utils"
import { auth, db } from "../firebase"
import { DocumentSnapshot, Firestore, doc, setDoc } from 'firebase/firestore'
import { useNavigation } from '@react-navigation/native'
//import { updateProfile } from 'firebase/auth'

export default function UpdateProfile() {
    const [displayName, setDisplayName] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [permissionStatus, setPermissionStatus] = useState(null)
    const navigation = useNavigation()

    const userData = {
        displayName,
        email: user.email,
    };

    const { theme: { colors } } = useContext(GlobalContext);

    const getUser = async () => {
        const currentUser = await Firestore()
            .collections('users')
            .doc(user.uid)
            .get()
            .then((documentSnapshot) => {
                if (documentSnapshot.exists) {
                    console.log('User Data', documentSnapshot.data());
                    userData(documentSnapshot.data());
                }
            })
    }
    useEffect(() => {
        getUser();
    }, []);

    async function handlePress() {
        const user = auth.currentUser;
        let photoURL;

        if (selectedImage) {
            // Upload the selected image and get the URL
            const { url } = await uploadImage(selectedImage, `images/${user.uid}`, "profilePicture");
            photoURL = url;
        }

        // Prepare the user data to update
        const userData = {
            displayName,
            email: user.email,
        };

        // If a new photoURL is available, include it in userData
        if (photoURL) {
            userData.photoURL = photoURL;
        }

        // Update user profile and database document
        await Promise.all([
            // Update user profile
            updateProfile(user, userData),
            // Update user document in the Firestore database
            setDoc(doc(db, "users", user.uid), { ...userData, uid: user.uid })
        ]);

        navigation.navigate("home");
    }

    const saveImage = async (selectedImage) => {
        try {
            setSelectedImage(selectedImage);
            //setModalVisible(flase);
        }
        catch (error) {
            throw error;
        }
    }


    async function handleProfilePicture() {
        const result = await pickImage()
        if (!result.canceled) {
            await saveImage(result.assets[0].uri);

        }

    }

    return (
        <React.Fragment>
            <StatusBar style="auto" />
            <View style={{
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                paddingTop: Constants.statusBarHeight + 20,
                padding: 20
            }}>

                <Text
                    style={{
                        fontSize: 22,
                        color: colors.text,

                    }}>Profile Info</Text>

                <Text
                    style={{
                        fontSize: 14,
                        color: colors.text,
                        marginTop: 20
                    }}>Please Provide your profile photo</Text>


                <TouchableOpacity
                    onPress={handleProfilePicture}
                    style={{
                        marginTop: 20,
                        borderRadius: 120,
                        width: 120,
                        height: 120,
                        backgroundColor: colors.background,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>

                    {!selectedImage ? (<MaterialCommunityIcons
                        name="camera-plus"
                        color={colors.iconGray}
                        size={45} />) : (

                        <Image
                            source={{ uri: selectedImage }}
                            style={{ width: "100%", height: "100%", borderRadius: 120 }}
                        />)}

                </TouchableOpacity>

                <View
                    style={{
                        marginTop: "auto",
                        width: 80
                    }}
                >
                    <Button
                        title="Update"
                        color={colors.secondary}
                        onPress={handlePress}
                    //disabled={!displayName}
                    />

                </View>

            </View>
        </React.Fragment>
    );
}