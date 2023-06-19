import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert,SafeAreaView,ScrollView } from 'react-native';
import {firestore, auth, notesRef2} from '../Config/FirebaseConfig';
import { COLORS, SHADOWS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import {useCollectionData} from "react-firebase-hooks/firestore";
import addNote from "../component/AddNote";
import deleteNote from "../component/DeleteNote";
import Bar from "./Bar";


const UserCart = () => {
    const navigation = useNavigation();
    const[notes] = useCollectionData(notesRef2, {idField: 'id'});
    const [notesData, setNotesData] = useState([]);
    const [priceSuggestions, setPriceSuggestions] = useState('');
    const[originalPrice, setOriginalPrice] = useState('');
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const snapshot = await firestore.collection('sellitems').get();

                const list = snapshot.docs.map((doc) => {
                    const { title, originalPrice, priceSuggestions, description, image,address} = doc.data();
                    return {
                        id: doc.id,
                        title: title,
                        originalPrice: originalPrice,
                        priceSuggestions: priceSuggestions,
                        date: doc.date,
                        description: description,
                        address: address,
                        userId: auth.currentUser ? auth.currentUser.uid : '',
                        image: image,
                    };
                    console.log('this is a indevioul list',list);
                });
                setNotesData(list);
            } catch (error) {
                console.log(error);
            }
            await fetchData();
        };
    }, []);

    const openMap = (address) => {
        if (!address || address === '') {
            alert('No address found');
            return;
        }

        const addressArray = address.split(',');

        if (addressArray.length < 2) {
            alert('Invalid address');
            return;
        }

        const lat = addressArray[0].trim();
        const lng = addressArray[1].trim();

        navigation.navigate('GoogleMapComponent', { lat, lng });
        console.log('this is a lat',lat);
        console.log('this is a lng',lng);
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            <Bar backgroundColor={COLORS.white} />
                <ScrollView style={{ flex: 1 }}>
                    <View style={styles.container}>

            {notes &&
                notes
                    .filter((item) => item.userId ===auth.currentUser.uid)
                    .map((item ,index) => (
                        <View key={`Sell-Item-${item.id}-${index}`} style={styles.Card}>
                            <View style={{ width: '100%', height: 250 }}>
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
                                        setOriginalPrice('');
                                    } else {
                                        setSelectedNote(item);
                                        console.log('this is a item',item);
                                        setOriginalPrice(item.priceSuggestions);
                                    }
                                }}
                            >
                                <Text style={styles.Textlarge}>
                                    {/*//diplay orginal price as a price suggestion*/}
                                    {item.priceSuggestions}
                                    <Image
                                        source={require('../assets/icons/dkk.png')}
                                        style={{ width: 25, height: 25 }}
                                    />
                                </Text>
                                {/*show date in readable format with /// */}
                                <Text style={styles.Textsmall}>Date: {item.date}</Text>
                                <Text style={styles.Textsmall}>
                                    Last bid by: {item.userId.substring(0, 3)}
                                </Text>
                            </TouchableOpacity>



                            {/* Place your additional components here */}
                            <TextInput
                                style={styles.Textinput}
                                onChangeText={(priceSuggestions) =>
                                    setPriceSuggestions(priceSuggestions)
                                }
                                keyboardType="numeric"
                                value={priceSuggestions}
                                placeholder="Place your Bid"
                            />

                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    onPress={() => addNote(selectedNote, originalPrice, priceSuggestions, setSelectedNote)}
                                    style={styles.Addbutton}
                                >
                                    <Text style={styles.Textbutton} value={item}>
                                        Add a Bid
                                    </Text>

                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => openMap(item.address)}
                                    value={item.address}
                                    style={styles.Addressbutton}
                                >
                                    <Text style={styles.Textsmall}>Address</Text>
                                </TouchableOpacity>
                                {selectedNote && (
                                    <TouchableOpacity
                                        onPress={() => deleteNote(item)}
                                        style={styles.Deletebutton}
                                    >
                                        <Text style={styles.DeletebuttonText}>Delete a Bid</Text>
                                    </TouchableOpacity>
                                )}

                            </View>

                            <View style={styles.brandcontainer}>
                                <Text style={styles.Textsmall}>{item.title}</Text>
                                <Text style={styles.Textsmall}>{item.description}</Text>
                                <Text style={{ fontSize: SIZES.extraLarge, fontWeight: 'bold' }}>
                                    {item.originalPrice}
                                    <Image
                                        source={require('../assets/icons/dkk.png')}
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }}
                                    />
                                </Text>
                            </View>
                        </View>

                ))}
           </View>


                    <View/>
</ScrollView>

        </SafeAreaView>

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
        backgroundColor: COLORS.white,
    },
    Card: {
        backgroundColor: COLORS.yellow,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin: SIZES.base,
        ...SHADOWS.dark,
        width: '95%',

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
    DeletebuttonText: {
        fontSize: SIZES.small,
        fontWeight: 'bold',
        color: COLORS.primary,
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

export default UserCart;
