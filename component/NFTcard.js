
//react native functinal export comment's
import React, {useState} from 'react';
import {View, Text,StyleSheet, Image, TouchableOpacity, TextInput} from 'react-native';
import {COLORS, SHADOWS, SIZES} from "../constants/index";
import{notesRef,firestore,auth } from '../Config/FirebaseConfig';
import {useCollectionData} from "react-firebase-hooks/firestore";
import {useNavigation} from "@react-navigation/native";







const NFTcard = ({data}) => {
    let navigation = useNavigation();
    const[notes] = useCollectionData(notesRef, {idField: 'id'});
    const [text, setText] = useState('');
    const [selectedNote, setSelectedNote] = useState(null);
    const currentUser = auth.currentUser;
    const userEmail = currentUser ? currentUser.email : '';
    const [image, setImage] = useState(null);

    //add new note to firebase with try and catch to nftdata collection id
    const addNote = async () => {
        // if the number more than previous price suggestion, you can add it to the database
        // and compear it with the previous price
        // const query = await firestore.collection('notes').where("text", "==", data.price).get();
        // const querySnapshot = query.docs[0];
        // const queryData = querySnapshot.data();
        // const queryPrice = queryData.priceSuggestion;
        if (text > data.price){
            firestore.collection('notes').doc(data.id).set({
                itemId: data.id,
                priceSuggestion: text,
                date: Date.now(),
                orginalPrice: data.price,
                user: userEmail,
                image:data.image,
                address:data.address,
            }).then(() => {
                alert('Price added to '+data.name+' with the price of '+ text.toString()+' DKK');
            }).catch((error) => {
                console.log(error);
            }
            );
        } else {
            alert('Price is lower than the previous price');
        }
    }



    const deleteNote = async () => {
        firestore.collection('notes').doc(data.id).delete().then(() => {
            alert('Price deleted from '+data.name+' with the price of '+ text.toString()+' DKK');
        }).catch((error) => {
            console.log(error);
        }
        );
        }
//going to address page in google map
    const goToAddress = () => {
        navigation.navigate('Googlemap', {data: data.address});
    }

    return (
        <View style={
            {backgroundColor: COLORS.white,
                borderRadius: SIZES.font,
                marginBottom: SIZES.extraLarge,
                margin:SIZES.base,
                ...SHADOWS.dark,

            }}>
            {/*//get data from firestore*/}



            <View style={{width: "100%", height: 250}}>
                <Image
                    source={data.image}
                    resizeMode="cover"
                    style={{
                        width: "100%",
                        height: "100%",
                        borderTopLeftRadius: SIZES.font,
                        borderTopRightRadius: SIZES.font,
                    }}
                />
            </View>
            <Text>ITEM FOR SELL</Text>
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
                            setText('');
                        }
                        else {

                            setSelectedNote(note);
                            console.log('selected note:', note);
                            setText(note.priceSuggestion);
                        }
                    }}

                >


                    {/*Only render the text for the selected note */}

                    <Text style={
                        {textDecorationLine: 'underline',
                            fontWeight: 'bold',
                            fontSize:SIZES.extraLarge,
                            color:COLORS.secondary}}
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
                    <Text style={{fontSize:SIZES.small}}>{new Date(note.date).toLocaleTimeString().slice(0, 5)}. {new Date(note.date).toLocaleDateString()}</Text>
                    {/*show the user password who placed the bid*/}
                    <Text style={{ fontSize: SIZES.small }}> User: {note.user}</Text>





                </TouchableOpacity>
            ))}
            <TextInput
                style={{
                    height: 50, borderColor: 'gray', borderWidth: 1,
                    padding: 10,
                    backgroundColor: 'white',
                    // make it circle edge
                    borderRadius: 20,
                    margin: 10}}
                onChangeText={text => setText(text)}
                keyboardType='numeric'
                value={text}
                placeholder="Place your Bid"
            />
            {/*//open google map page*/}
            <View style={styles.container}>


<TouchableOpacity
    onPress={addNote}
    style={{
        height: 50, borderColor: 'gray', borderWidth: 1,
        padding: 15,
        backgroundColor: COLORS.secondary,
        // make it circle edge
        borderRadius: 20,
        margin: 10,
        alignItems:'center',
        JustifyContent:'center',
        width: 100
    }}
>

    <Text style={{fontSize: SIZES.small, fontWeight: 'bold',color: COLORS.white}}>Place a Bid</Text>
</TouchableOpacity>
            {selectedNote && (
                <TouchableOpacity

                    onPress={deleteNote}
                    style={{
                        height: 50, borderColor: 'gray', borderWidth: 1,
                        padding: 15,
                        backgroundColor: COLORS.white,
                        // make it circle edge
                        borderRadius: 20,
                        margin: 10,
                        alignItems:'center',
                        JustifyContent:'center',
                        width: 100
                        }
                    }
                >
                    <Text style={{fontSize: SIZES.small, fontWeight: 'bold'}}>Delete a Bid</Text>
                </TouchableOpacity>

            )}
                <TouchableOpacity onPress={goToAddress}
                                  style={{
                                      height: 50, borderColor: 'gray', borderWidth: 1,
                                      padding: 15,
                                      backgroundColor: COLORS.green2,
                                      // make it circle edge
                                      borderRadius: 20,
                                      margin: 10,
                                      alignItems: 'center',
                                      JustifyContent: 'center',
                                      width: 100
                                  }}
                >
                    <Text style={{fontSize: SIZES.small, fontWeight: 'bold',color: COLORS.primary}}> ADDRESS</Text>

                </TouchableOpacity>
            </View>







            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZES.base}}>
                <Text style={{fontSize: SIZES.small, fontWeight: 'bold'}}>{data.creator}</Text>
                <Text style={{fontSize: SIZES.small, fontWeight: 'bold'}}>{data.date}</Text>
                <Text style={{fontSize: SIZES.small, fontWeight: 'bold'}}>{data.name}</Text>
                <Text style={{fontSize: SIZES.extraLarge, fontWeight: 'bold'}}>{data.price}<Image
                    source={data.eth}
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


    }
});




export default NFTcard;