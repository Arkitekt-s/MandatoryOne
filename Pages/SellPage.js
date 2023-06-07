import React, {useEffect, useState} from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    SafeAreaView,
    Image,
    FlatList,
    ScrollView
} from 'react-native';

import {COLORS, SHADOWS, SIZES} from '../constants';
import { auth, firestore, firebase, storage, notesRef } from "../Config/FirebaseConfig";
import {useNavigation} from "@react-navigation/native";
import Bar from "../component/Bar";
import ImagePickerComponent from "../component/ImagePickerComponent";
import UploadImageComponent from "../component/UploadImageComponent";




    const SellPage = ({route}) => {
         const { newAddress } =  route?.params ?? {};




        // const { handleGoogleMapPress } = getLocation();
        let navigation = useNavigation();
        const [image, setImage] = useState(null);
        const [uploading, setUploading] = useState(false);
        const [title, setTitle] = useState('');
        const [price, setPrice] = useState('');
        const [description, setDescription] = useState('');
        const [location, setLocation] = useState(newAddress ?? 'no address');
        //By using the useEffect hook with newAddress as a dependency, the location state will be updated whenever newAddress changes.
        useEffect(() => {
            if (newAddress) {
                setLocation(newAddress);
            }
        }, [newAddress]);

        const handleImageSelected = (selectedImage) => {
            setImage(selectedImage);
        };

        const handleSell = async () => {
            try {
                if (image && title && price && description) {
                    const uploadTask = await UploadImageComponent(image);
                    const snapshot = await uploadTask;
                    const url = await snapshot.ref.getDownloadURL();
                    const documentName = `Sell-Item- ${Date.now()} `;

                    await firestore.collection('items').doc(documentName).set({
                        //uniq sell id for each item
                        userId: auth.currentUser.uid.slice(0, 5),
                        title: title,
                        price: price,
                        date: Date.now(),
                        description: description,
                        address: location,
                        image: url,
                    });

                    alert('item added');
                    navigation.goBack();
                } else {
                    alert('Please fill all fields');
                }
            } catch (error) {
                console.log(error);
            }
        };


        // const GoogleMapPress = async () => {
        //     const result = await navigation.navigate('Googlemap', { location:location});
        //     setLocation(result);
        // };
        const GoogleMapPress = async () => {
            const result = await navigation.navigate('Googlemap', { location: location });
            if (result && result.params && result.params.newAddress) {
                setLocation(result.params.newAddress);
            }
        };



        return (
            //particularly on devices with notches, rounded corners
            <SafeAreaView style={{ flex: 1 }}>
                {/*back ground of page color*/}
                <Bar backgroundColor={COLORS.green2} />
                <ScrollView style={{ flex: 1 }}>

                    <View style={
                        {backgroundColor: COLORS.white,
                            borderRadius: SIZES.font,
                            marginBottom: SIZES.extraLarge,
                            margin:SIZES.base,
                            ...SHADOWS.dark,

                        }}>
                        {/*//user id email*/}
                        <Text style={styles.text}>User ID: {auth.currentUser.uid.slice(0, 5)}</Text>
                        <Text style={styles.text}>Date: {new Date().toDateString()}</Text>
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
                        {/*//show date*/}


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
                        {/*<TextInput*/}
                        {/*    style={styles.input}*/}
                        {/*    placeholder="Address"*/}
                        {/*    value={location}*/}
                        {/*    //change text to outcoming text of google map address*/}
                        {/*    onChangeText={setLocation}*/}
                        {/*    color={COLORS.primary}*/}
                        {/*    backgroundColor={COLORS.white}*/}
                        {/*/>*/}
                        {/*//address is latetiute and langtitude of map*/}

                        {/*<Text style={styles.text}>Address: {address}</Text>*/}
                        {/*//google map get address from textInput address*/}
                        <TouchableOpacity style={styles.button}
                                          value={location}
                                          onPress={GoogleMapPress}>
                            {/*save address*/}
                            <Text style={styles.buttonText}>Google map</Text>

                        </TouchableOpacity>
                        {/*RESULT OF GOOGLE MAP*/}
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={location}
                            //set location to new address
                            // onChangeText={newAddress => setLocation(newAddress ?? '' )}
                            editable={false}
                            // onChangeText={setLocation}
                            color={COLORS.primary}
                            backgroundColor={COLORS.white}
                        />

                        {/*//preview image after pick and hide the button*/}

                        <ImagePickerComponent onImageSelected={handleImageSelected} />

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
                </ScrollView>
            </SafeAreaView>



        );


}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: { fontSize: 20,
        color: COLORS.secondary,
        fontWeight: 'bold',
        padding: 10,
        margin: 5,

    },
    input: {
        width: 250,
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


