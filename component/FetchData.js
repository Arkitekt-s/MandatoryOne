import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import {firestore, auth, notesRef} from '../Config/FirebaseConfig';
import { COLORS, SHADOWS, SIZES } from "../constants";
import Googlemap from "./Googlemap";
import { useNavigation } from "@react-navigation/native";
import {map} from "mathjs";
import {useCollectionData} from "react-firebase-hooks/firestore";

const FetchData = () => {
    const navigation = useNavigation();
    const[notes] = useCollectionData(notesRef, {idField: 'id'});
    const [notesData, setNotesData] = useState([]);
    const [priceSuggestions, setPriceSuggestions] = useState('');
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await firestore.collection('sellitems').get();

                const list = snapshot.docs.map((doc) => {
                    const { title, originalPrice, priceSuggestions, description, image,address } = doc.data();
                    return {
                        id: doc.id,
                        title: title,
                        originalPrice: originalPrice,
                        priceSuggestions: priceSuggestions,
                        date: new Date().toLocaleDateString(),
                        description: description,
                        address: address,
                        userId: auth.currentUser ? auth.currentUser.uid : '',
                        image: image,
                    };
                    console.log('list', list);
                });
                setNotesData(list);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const addNote = async () => {
        const notesSnapshot = await firestore.collection('sellitems').get();
        const notes = [];
        notesSnapshot.forEach((doc) => {
            const note = doc.data();
            note.id = doc.id;
            notes.push(note);
        });
    };

    const deleteNote = async (item) => {
        try {
            await firestore
                .collection('sellitems')
                .doc(item.id)
                .delete()
                .then(() => {
                    alert('Item deleted: ' + item.title + ' with the price of ' + (item.originalPrice !== undefined ? item.originalPrice.toString() : 'N/A') + ' DKK');
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log('Error deleting data:', error);
        }
    };




    const openMap = (address) => {
        if (!address || address === '') {
            alert('No address found');
            return;
        }
        const addressArray = address.split(',');
        const latitude = parseFloat(addressArray[0].trim());
        const longitude = parseFloat(addressArray[1].trim());
        if (isNaN(latitude) || isNaN(longitude)) {
            alert('Invalid address');
            return;
        }
        navigation.navigate('Googlemap', {
            latitude,
            longitude,
        });
    };




    return (
        <View style={styles.container}>


            {notesData && notesData
                .filter(item => item.priceSuggestions === priceSuggestions)

                .map((item) => (
                    <View key={`Sell-Item-${item.id}`} style={styles.Card}>
                    <View style={{ width: "100%", height: 250 }}>
                        <Image
                            source={{ uri: item.image }}
                            resizeMode="cover"
                            style={styles.Imagecard}
                        />
                    </View>
                    <TouchableOpacity
                        key={item.id}
                        item={item}
                        onPress={() => {
                            if (selectedNote && selectedNote.id === item.id) {
                                setSelectedNote(null);
                                setPriceSuggestions('');
                            } else {
                                setSelectedNote({
                                    id: item.id,
                                    priceSuggestions: item.priceSuggestions,
                                });
                                setPriceSuggestions(item.priceSuggestions);
                            }
                        }}
                    >
                        <Text style={styles.Textlarge}>
                            {item.originalPrice}
                                <Image source={require('../assets/icons/dkk.png')}
                                                           style={{width: 25, height: 25,}} />
                        </Text>
                        {/*show date in readable format*/}
                        <Text style={styles.Textsmall}>Date: {item.date}</Text>
                        <Text style={styles.Textsmall}>Last bid by: {item.userId.substring(0, 5)}</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.Textinput}
                        onChangeText={setPriceSuggestions}
                        keyboardType='numeric'
                        value={priceSuggestions}
                        placeholder="Place your Bid"
                    />
                    {/* Place your additional components here */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => addNote(item.id)}
                                          style={styles.Addbutton}>
                            <Text style={styles.Textbutton}>Place a Bid</Text>
                        </TouchableOpacity>
                        {selectedNote && (
                            <TouchableOpacity
                                onPress={() => deleteNote(item.id)}
                                style={styles.Deletebutton}>
                                <Text style={styles.Textbutton}>Delete a Bid</Text>
                            </TouchableOpacity>
                        )}
                        <TouchableOpacity onPress={() => openMap(item.address)}
                                          value={item.address}
                                          style={styles.Addressbutton}>
                            <Text style={styles.Textsmall}>Address</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.brandcontainer} key={item.id}>
                        <Text style={styles.Textsmall}>{item.title}</Text>
                        <Text style={styles.Textsmall}>{item.description}</Text>
                        <Text style={{ fontSize: SIZES.extraLarge, fontWeight: 'bold' }}>
                            {item.originalPrice}
                            <Image
                                source={require('../assets/icons/dkk.png')}
                                style={{
                                    width: 25,
                                    height: 25,
                                }
                                }
                            />
                        </Text>
                    </View>
                </View>
            ))}

        </View>


    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        // item in front of each other
        flexDirection: 'row',
        //
        flexWrap: 'wrap',
    },
    Card: {
        backgroundColor: COLORS.yellow,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
        width: '100%',

    },
    brandcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.base,
    },
    Imagecard: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: SIZES.font,
        borderTopRightRadius: SIZES.font,
    },
    Textsmall: {
        fontSize: SIZES.small,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    Textlarge: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: SIZES.extraLarge,
        color: COLORS.secondary,
    },
    Textbutton: {
        fontSize: SIZES.small,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    Textinput: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        margin: 10,
    },
    Deletebutton: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 15,
        backgroundColor: COLORS.white,
        borderRadius: 20,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },
    Addressbutton: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 15,
        backgroundColor: COLORS.yellow,
        borderRadius: 20,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },
    Addbutton: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 15,
        backgroundColor: COLORS.secondary,
        borderRadius: 20,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        alignContent: 'center',


    },
});

export default FetchData;
