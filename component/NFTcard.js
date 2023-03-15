
//react native functinal export comment's
import React, {useState} from 'react';
import {View, Text, Image, Button, TouchableOpacity, TextInput, FlatList} from 'react-native';
import {useNavigation} from "@react-navigation/native";
import {COLORS, SHADOWS, SIZES} from "../constants/index";
import{firestore} from '../Config/FirebaseConfig';
import {useCollectionData} from "react-firebase-hooks/firestore";
const NFTcard = ({data}) => {
    const navigation = useNavigation();
    const notesRef = firestore.collection('notes');
    const[notes] = useCollectionData(notesRef, {idField: 'id'});
    const [text, setText] = useState('');
    const [selectedNote, setSelectedNote] = useState(null);
    //add new note to fierbase
    const addNote = async () => {
        await notesRef.add({
            text1: text,
        });
        setText('');
    }

    //update note
    const updateNote = async () => {
        await notesRef.doc(selectedNote.id).update({
            text1: text,
        });
        setSelectedNote(null);
        setText('');
    }
    //delete note
    const deleteNote = async () => {
        await notesRef.doc(selectedNote.id).delete();
        setSelectedNote(null);
        setText('');
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

            {notes && notes.map(note => (
                <TouchableOpacity key={note.id} onPress={() => {
                    setSelectedNote(note);
                    setText(note.text1);
                }
                }>
                    <Text>{note.text1}</Text>
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
            />
            <Button
                onPress={selectedNote ? updateNote : addNote}
                title={selectedNote ? 'Update Price' : 'Price Suggestion '}
                color="#841584"

            />
            {selectedNote && (
                <Button
                    onPress={deleteNote}
                    title="Delete Price "
                    color="#d11a2a"
                />
            )}


            <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SIZES.base}}>
                <Text style={{fontSize: SIZES.medium, fontWeight: 'bold'}}>{data.creator}</Text>
                <Text style={{fontSize: SIZES.small, fontWeight: 'bold'}}>{data.date}</Text>
                <Text style={{fontSize: SIZES.small, fontWeight: 'bold'}}>{data.name}</Text>
                <Text style={{fontSize: SIZES.medium, fontWeight: 'bold'}}>{data.price}</Text>
                <Image
                    source={data.eth}
                    resizeMode="cover"
                    style={{
                        width: 25,
                        height: 25,
                    }
                    }

                />

                {/*//image of eth*/}



            </View>
        </View>
    );
};

export default NFTcard ;
