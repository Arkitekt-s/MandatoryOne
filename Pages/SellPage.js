import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { COLORS } from '../constants';
import { auth, firestore, firebase, storage, notesRef } from "../Config/FirebaseConfig";

const SellPage = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
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
        const ref = firebase.storage().ref().child("image");
        try {
            await ref.put(blob);
            setUploading(false);
            alert('Image uploaded successfully');
        } catch (error) {
            console.log(error);
        }
    };

    const handleSell = async () => {
        // Handle sell button press
        try {
            if (image && title && price && description) {
                const uploadTask = await uploadImage(image);
                uploadTask.on(
                    'state_changed',
                    (snapshot) => {},
                    (error) => {
                        console.log(error);
                    }
                );
                const url = await storage
                    .ref('images/' + image.fileName)
                    .getDownloadURL();
                await firestore.collection('nftdata').add({
                    title: title,
                    price: price,
                    description: description,
                    image: url,
                });
                alert('NFT added');
            } else {
                alert('Please fill all fields');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <SafeAreaView>
            <View style={styles.container} backgroundColor={COLORS.primary}>
                <Text style={styles.text}>Sell NFT</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Title"
                    value={title}
                    onChangeText={setTitle}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Price"
                    value={price}
                    onChangeText={setPrice}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Description"
                    value={description}
                    onChangeText={setDescription}
                />
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Pick an image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={uploadImage}>
                    <Text style={styles.buttonText}>Upload image</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSell}>
                    <Text style={styles.buttonText}>Sell</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: { fontSize: 30, color: COLORS.white },
    input: {
        width: 300,
        height: 50,
        borderWidth: 1,
        borderColor: COLORS.white,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        color: COLORS.white,
    },
    button: {
        width: 300,
        height: 50,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        padding: 10,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: { fontSize: 20, color: COLORS.primary },
});
export default SellPage;


