import React, { useState } from 'react';

import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import {COLORS, SIZES} from "../constants";

const ImagePickerComponent = ({ onImageSelected }) => {
    const [image, setImage] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const source = { uri: result.assets[0].uri };
            setImage(source);
            onImageSelected(source);
        }
    };

    return (
        <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Image</Text>
        </TouchableOpacity>
    );

};
const styles = StyleSheet.create({
    button: {
        width: 100,
        height: 50,
        backgroundColor: COLORS.secondary,
        borderRadius: 20,
        padding: 15,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: COLORS.secondary,
    },
    buttonText: { fontSize: SIZES.small, color: COLORS.white, fontWeight: 'bold'},
});



export default ImagePickerComponent;
