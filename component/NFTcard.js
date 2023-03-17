
//react native functinal export comment's
import React, {useState} from 'react';
import {View, Text, Image, Button, TouchableOpacity, TextInput} from 'react-native';
import {COLORS, SHADOWS, SIZES} from "../constants/index";
import{notesRef,firestore } from '../Config/FirebaseConfig';
import {useCollectionData} from "react-firebase-hooks/firestore";




const NFTcard = ({data}) => {
    const[notes] = useCollectionData(notesRef, {idField: 'id'});
    const [text, setText] = useState('');
    const [selectedNote, setSelectedNote] = useState(null);
    //add new note to firebase with try and catch to nftdata collection id
    const addNote = async () => {
        firestore.collection('notes').doc(data.id).set({
            text123: text,
            date: Date.now(),
            orginalPrice: data.price,

        }).then(() => {
            alert('Price added to '+data.name+' with the price of '+ text.toString()+' ETH');
        }).catch((error) => {
            console.log(error);
        }
        );
        }
    const deleteNote = async () => {
        firestore.collection('notes').doc(data.id).delete().then(() => {
            alert('Price deleted from '+data.name+' with the price of '+ text.toString()+' ETH');
        }).catch((error) => {
            console.log(error);
        }
        );
        }


    return (
        <View style={
            {backgroundColor: COLORS.white,
                borderRadius: SIZES.font,
                marginBottom: SIZES.extraLarge,
                margin:SIZES.base,
                ...SHADOWS.dark,

            }}>
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
            <Text>NFTcards</Text>
            {/*show only the text realated to each nfd card */}
            {notes && notes.map((i) => (
                <TouchableOpacity
                    key={i.date}
                    data={i}
                    onPress={() => {
                        setSelectedNote(i);
                        console.log('selected note:', i);
                        setText(i.text123);
                    }
                    }
                >

                    {/*text with underline and bold*/}
                    <Text style={
                        {textDecorationLine: 'underline',
                            fontWeight: 'bold',
                            fontSize:SIZES.extraLarge,
                            color:COLORS.gray}}
                    >{i.text123}<Image
                        source={data.eth}
                        resizeMode="cover"
                        style={{
                            width: 25,
                            height: 25,
                        }
                        }
                    /></Text>
                    {/*//show the time of the bid*/}
                    <Text style={{fontSize:SIZES.small}}>{new Date(i.date).toLocaleTimeString().slice(0, 5)}. {new Date(i.date).toLocaleDateString()}</Text>
                </TouchableOpacity>
            ))}
            <TextInput
                style={{
                    height: 40, borderColor: 'gray', borderWidth: 1,
                    padding: 10,
                    backgroundColor: 'white',
                    // make it circle edge
                    borderRadius: 20,
                    margin: 10}}
                onChangeText={text => setText(text)}
                value={text}
                placeholder="Place your Bid"

            />
<Button
    onPress={addNote}
    title="Place a Bid "
    color="#841584"
    accessibilityLabel="Learn more about this purple button"
/>

            {selectedNote && (
                <Button
                    onPress={deleteNote}
                    title="Delete a Bid "
                    color="#d11a2a"

                />

            )}







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

export default NFTcard;