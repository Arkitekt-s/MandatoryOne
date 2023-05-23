import React, { useState } from 'react';
import {View, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView, Image, FlatList} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {COLORS, SHADOWS, SIZES} from '../constants';
import { auth, firestore, firebase, storage, notesRef } from "../Config/FirebaseConfig";
import {useNavigation} from "@react-navigation/native";
import Googlemap from "../component/Googlemap";

const SellPage = () => {
    let navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            const source = { uri: result.assets[0].uri };
            console.log(source);
            setImage(source);
        }
    };


    const uploadImage = async () => {
        setUploading(true);
        const response = await fetch(image.uri);
        const blob = await response.blob();
        // date in nice way
        const imageName = `Sell-Item- ${Date.now()} `;
        const ref = firebase.storage().ref().child(`image/${imageName}`);

        try {
            const uploadTask = ref.put(blob);
            await uploadTask;
            setUploading(false);
            alert('Image uploaded successfully');
            return uploadTask;
        } catch (error) {
            console.log(error);
        }
    };


    const handleSell = async () => {
        try {
            if (image && title && price && description) {
                const uploadTask = await uploadImage(image);
                const snapshot = await uploadTask;
                const url = await snapshot.ref.getDownloadURL();
                const documentName = `Sell-Item- ${Date.now()} `;


                await firestore.collection('notes').doc(documentName).set({
                    title: title,
                    price: price,
                    description: description,
                    address: location,
                    image: url,
                });

                alert('NFT added');
                navigation.goBack();
            } else {
                alert('Please fill all fields');
            }
        } catch (error) {
            console.log(error);
        }
    };
    const handleGoogleMapPress = () => {
        navigation.navigate('Googlemap', { location: location });
    };



    return (
        <View style={
            {backgroundColor: COLORS.white,
                borderRadius: SIZES.font,
                marginBottom: SIZES.extraLarge,
                margin:SIZES.base,
                ...SHADOWS.dark,

            }}>
                <Text style={styles.text}>Sell Item</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Title"

                    value={title}
                    backgroundColor={COLORS.white}
                    onChangeText={setTitle}
                    // color of text
                    color={COLORS.primary}
                />
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Price"
                    value={price}
                    onChangeText={setPrice}
                    color={COLORS.primary}
                    backgroundColor={COLORS.white}
                />
                <TextInput
                    //make it more lines
                    multiline={true}
                    editable
                    numberOfLines={4}
                    maxLength={40}
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                    color={COLORS.primary}
                    backgroundColor={COLORS.white}
                />
            {/*//address*/}
            <TextInput
                style={styles.input}
                placeholder="Address"
                value={location}
                onChangeText={setLocation}
                color={COLORS.primary}
                backgroundColor={COLORS.white}

            />
            {/*//google map get address from textInput address*/}
            <TouchableOpacity style={styles.button}
                              value={location}
                              onPress={handleGoogleMapPress}>
                <Text style={styles.buttonText}>Google Map</Text>
            </TouchableOpacity>

                {/*//preview image after pick and hide the button*/}

                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Pick an image</Text>
                </TouchableOpacity>

                 {/*after upload image and fill the text input, press sell button*/}
                <TouchableOpacity style={styles.button} onPress={handleSell}>
                    <Text style={styles.buttonText}>Sell</Text>
                </TouchableOpacity>

            <View style={{width: "100%", height: 250}}>
            {image && (
                <Image
                    source={{ uri: image.uri }}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: SIZES.font,
                        borderTopRightRadius: SIZES.font,
                    }}
                />
            )}
                </View>
            </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: { fontSize: 30, color: COLORS.secondary, fontWeight: 'bold'},
    input: {
        width: 200,
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 20,
        padding: 10,
        margin: 10,
        color: COLORS.white,
    },
    button: {
        width: 150,
        height: 50,
        backgroundColor: COLORS.secondary,
        borderRadius: 20,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: COLORS.secondary,
    },
    buttonText: { fontSize: 16, color: COLORS.white, fontWeight: 'bold'},
});
export default SellPage;


