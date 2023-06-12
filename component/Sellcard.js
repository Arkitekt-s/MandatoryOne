//react native functinal export comment's
import React, {useState} from 'react';
import {View, Text,StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import {COLORS, SHADOWS, SIZES} from "../constants/index";
import{notesRef,firestore,auth } from '../Config/FirebaseConfig';
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useNavigation} from "@react-navigation/native";
import { Alert } from 'react-native';





const Sellcard = ({data}) => {

    let navigation = useNavigation();
    const[notes] = useCollectionData(notesRef, {idField: 'id'});
    const [price, setPrice] = useState('');
    const [selectedNote, setSelectedNote] = useState(null);
    const currentUser = auth.currentUser;
    const userEmail = currentUser ? currentUser.email : '';

    //read from firebase


    //add new note to firebase with try and catch
    const addNote = async () => {
        //does not allow user to bid more the previous price of each item in the list
        const notesSnapshot = await firestore.collection('items').get();
        const notes = [];
        notesSnapshot.forEach((doc) => {
            const note = doc.data();
            note.id = doc.id;
            notes.push(note);
        });
        const lastPrice = notes.filter((note) => note.orginalPrice === data.price)[0];


        if (price=== '') {
            alert('Please enter a price');
            return;
        }
        if (isNaN(price)) {
            alert('Please enter a number');
            return;
        }
        //IF its no price for the items suggested
        if (lastPrice === undefined  && price > data.price) {
            firestore.collection('items').doc(data.id).set({
                itemId: data.id,
                priceSuggestion: price,
                date: Date.now(),
                orginalPrice: data.price,
                user: userEmail,
                image:data.image,
                address:data.address,
            }).then(() => {
                alert('Price added to '+data.brand+' with the price of '+ price.toString()+' DKK');
            }).catch((error) => {
                //give alart if the price is lower than the orginal price
                console.log(error);
                Alert.alert('Price is lower than the original price');
            });
            return;

        }



//its about compear the price with the last price
        if (price> lastPrice.priceSuggestion  && price > data.price  ) {
            firestore.collection('items').doc(data.id).set({
                itemId: data.id,
                priceSuggestion: price,
                date: Date.now(),
                orginalPrice: data.price,
                user: userEmail,
                userId: auth.currentUser.uid.slice(0, 5),
                image:data.image,
                address:data.address,
            }).then(() => {
                alert('Price added to '+data.brand+' with the price of '+ price.toString()+' DKK');
            }).catch((error) => {
                console.log(error);
            });
        } else {
            alert('Price is lower than the previous price');
        }
    }
    //should only be able the price no less than orginal price





    const deleteNote = async () => {
        firestore.collection('items').doc(data.id).delete().then(() => {
            alert('Price deleted from '+data.brand+' with the price of '+ price.toString()+' DKK');
        }).catch((error) => {
                console.log(error);
            }
        );
    }


    //open google map
    const openMap = () => {
        navigation.navigate('Googlemap', {location: data.address});
        if (data.address === '') {
            alert('No address provided');
        }

    }



    return (

        <View style={styles.Card}>

            <View style={{width: "100%", height: 250}}>
                <Image
                    source={data.image}
                    resizeMode="cover"
                    style={styles.Imagecard}
                />
            </View>
            {/*show only the text realated to each nfd card */}
            {notes && notes
                .filter((note) => note.orginalPrice === data.price)
                .map((note) => (
                    <TouchableOpacity
                        key={note.id}
                        data={note}
                        onPress={() => {
                            if (selectedNote && selectedNote.id === note.id) {
                                setSelectedNote(null);
                                setPrice('');
                            }
                            else {
                                setSelectedNote(note);
                                console.log('selected note:', note);
                                setPrice(note.priceSuggestion);
                            }
                        }}
                    >
                        {/*Only render the text for the selected note */}
                        <Text style={styles.Textlarge}
                        >{note.priceSuggestion}
                            <Image
                                source={data.dkk}
                                resizeMode="cover"
                                style={{
                                    width: 25,
                                    height: 25,
                                }}
                            /></Text>
                        {/*//show the time of the bid*/}
                        <Text style={styles.Textsmall}>{new Date(note.date).toLocaleTimeString().slice(0, 5)}. {new Date(note.date).toLocaleDateString()}</Text>
                        {/*show the user password who placed the bid*/}
                        <Text style={styles.Textsmall}> Last bid by: {note.user}</Text>

                    </TouchableOpacity>
                ))}
            <TextInput
                style={styles.Textinput}
                onChangeText={price => setPrice(price)}
                keyboardType='numeric'
                value={price}
                placeholder="Place your Bid"
            />
            {/*//open google map page*/}
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={addNote}
                    style={styles.Addbutton}>
                    <Text style={styles.Textbutton}>Place a Bid</Text>
                </TouchableOpacity>
                {selectedNote && (
                    <TouchableOpacity
                        onPress={deleteNote}
                        style={styles.Deletebutton}>
                        <Text style={styles.Textsmall}>Delete a Bid</Text>
                    </TouchableOpacity>
                )}
                {/*googing to google map page*/}
                <TouchableOpacity onPress={openMap}
                                  value={data.address}
                                  style={styles.Addressbutton}>
                    <Text style={styles.Textsmall}> Address</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.brandcontainer}>
                <Text style={styles.Textsmall}>{data.category}</Text>
                <Text style={styles.Textsmall}>{data.date}</Text>
                <Text style={styles.Textsmall}>{data.brand}</Text>
                <Text style={{fontSize: SIZES.extraLarge, fontWeight: 'bold'}}>{data.price}
                    <Image
                        source={data.dkk}
                        style={{
                            width: 25,
                            height: 25,
                        }
                        }
                    /></Text>

            </View>

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
        // space between each item
    },
    brandcontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: SIZES.base
    },
    Imagecard: {
        width: "100%",
        height: "100%",
        borderTopLeftRadius: SIZES.font,
        borderTopRightRadius: SIZES.font,
    },

    Card: {
        backgroundColor: COLORS.yellow,
        borderRadius: SIZES.font,
        marginBottom: SIZES.extraLarge,
        margin:SIZES.base,
        ...SHADOWS.dark,
    },
    Textsmall: {
        fontSize: SIZES.small,
        fontWeight: 'bold',
        color: COLORS.primary
    },
    Textlarge: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize:SIZES.extraLarge,
        color:COLORS.secondary
    },
    Textbutton: {
        fontSize: SIZES.small,
        fontWeight: 'bold',
        color: COLORS.white
    },
    Textinput: {
        height: 50, borderColor: 'gray', borderWidth: 1,
        padding: 10,
        backgroundColor: 'white',
        // make it circle edge
        borderRadius: 20,
        margin: 10
    },
    Deletebutton: {
        height: 50, borderColor: 'gray', borderWidth: 1,
        padding: 15,
        backgroundColor: COLORS.white,
        // make it circle edge
        borderRadius: 20,
        margin: 10,
        alignItems:'center',
        JustifyContent:'center',
        width: 100
    },
    Addressbutton: {
        height: 50, borderColor: 'gray', borderWidth: 1,
        padding: 15,
        backgroundColor: COLORS.yellow,
        // make it circle edge
        borderRadius: 20,
        margin: 10,
        alignItems: 'center',
        JustifyContent: 'center',
        width: 100
    },
    Addbutton: {

        height: 50, borderColor: 'gray', borderWidth: 1,
        padding: 15,
        backgroundColor: COLORS.secondary,
        // make it circle edge
        borderRadius: 20,
        margin: 10,
        alignItems:'center',
        JustifyContent:'center',
        width: 100
    }





});




export default Sellcard;