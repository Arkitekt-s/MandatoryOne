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
import { auth, firestore} from "../Config/FirebaseConfig";
import {useNavigation} from "@react-navigation/native";
import Bar from "../component/Bar";
import ImagePickerComponent from "../component/ImagePickerComponent";
import UploadImageComponent from "../component/UploadImageComponent";
import moment from 'moment';



    const SellPage = ({route}) => {
         const { newAddress } =  route?.params ?? {};
        const [notesData, setNotesData] = useState([]);



        // const { handleGoogleMapPress } = getLocation();
        let navigation = useNavigation();
        const [image, setImage] = useState(null);
        const [priceSuggestions, setPriceSuggestions] = useState('');
        const [uploading, setUploading] = useState(false);
        const [title, setTitle] = useState('');
        const [originalPrice, setOriginalPrice] = useState('');
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
                if (image && title && originalPrice && description) {
                    const uploadTask = await UploadImageComponent(image);
                    const snapshot = await uploadTask;
                    const url = await snapshot.ref.getDownloadURL();
                    const documentName = `Sell-Item- ${auth.currentUser.uid.slice(0, 3)}-${moment().format('MMMM Do YYYY, h:mm:ss a')}`;

                    await firestore.collection('sellitems').doc(documentName).set({
                        //uniq sell id for each item
                        userId: auth.currentUser.uid.slice(0, 3),
                        title: title,
                        originalPrice: originalPrice,
                        priceSuggestions: priceSuggestions,
                        date: moment().format('MMMM Do YYYY, h:mm:ss a'),
                        description: description,
                        address: location,
                        image: url,
                    });

                    alert('item added');
                    //// Update the notesData state variable by fetching the updated data from Firestore.
                    const notesSnapshot = await firestore.collection('sellitems').get();
                    const notes = [];
                    notesSnapshot.forEach((doc) => {
                        const note = doc.data();
                        note.id = doc.id;
                        notes.push(note);
                    });

                    setNotesData(notes);

                    navigation.navigate('HomePage');
                } else {
                    alert('Please fill all fields');
                }
            } catch (error) {
                console.log(error);
            }
        };

        const GoogleMapPress = async () => {
            const result = await navigation.navigate('Googlemap', { location: location });
            if (result && result.params && result.params.newAddress) {
                setLocation(result.params.newAddress);
            }
        };



        return (
            //particularly on devices with notches, rounded corners
            <SafeAreaView style={{ flex: 1 }} backgroundColor={COLORS.primary}>
                {/*back ground of page color*/}
                <Bar backgroundColor={COLORS.primary} />
                <ScrollView style={{ flex: 1 }}>

                    <View style={
                        {backgroundColor: COLORS.yellow,
                            borderRadius: SIZES.font,
                            marginBottom: SIZES.extraLarge,
                            margin:SIZES.base,
                            ...SHADOWS.dark,

                        }}>
                        {/*//user id email*/}
                        <Text style={styles.text}>User ID: {auth.currentUser.uid.slice(0, 5)}</Text>
                        <Text style={styles.text}>Date: {new Date().toDateString()}</Text>
                        <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            placeholder="Title"

                            value={title}
                            backgroundColor='white'
                            onChangeText={setTitle}
                            // color of text
                            color={COLORS.primary}
                        />
                        </View>
                        <View style={styles.container}>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            placeholder="Price"
                            value={originalPrice}
                            onChangeText={setOriginalPrice}
                            color={COLORS.primary}
                            backgroundColor='white'
                        />
                        </View>
                        {/*//show date*/}

                        <View style={styles.container}>
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
                            backgroundColor='white'
                        />
                        </View>

                        <View style={styles.container}>

                        <TouchableOpacity style={styles.button}
                                          value={location}
                                          onPress={GoogleMapPress}>
                            {/*save address*/}
                            <Text style={styles.buttonText}>Address</Text>
                        </TouchableOpacity>


                        {/*RESULT OF GOOGLE MAP*/}
                        <TextInput
                            style={styles.input}
                            placeholder="Address"
                            value={location}
                            editable={false}
                            color={COLORS.primary}
                            backgroundColor='white'
                        />


                        {/*//preview image after pick and hide the button*/}

                        <ImagePickerComponent onImageSelected={handleImageSelected} />


                        {/*after upload image and fill the text input, press sell button*/}

                        <TouchableOpacity style={styles.buttonsell} onPress={handleSell}>
                            <Text style={styles.buttonText}>Sell</Text>
                        </TouchableOpacity>
                        </View>


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
        // item in front of each other
        flexDirection: 'row',
        //
        flexWrap: 'wrap',
        // space between each item
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
        width: 100,
        height: 50,
        backgroundColor: COLORS.secondary,
        borderRadius: 20,
        padding: 15,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: COLORS.yellow,
    },
    buttonText: { fontSize: SIZES.small, color: COLORS.white, fontWeight: 'bold'},
    buttonsell: {
        width: 100,
        height: 50,
        backgroundColor: COLORS.secondary,
        borderRadius: 20,
        padding: 15,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        color: COLORS.secondary,

    }
});
export default SellPage;


