// shopping card
import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import {firestore, auth, notesRef2} from '../Config/FirebaseConfig';
import { COLORS, SHADOWS, SIZES } from "../constants";
import { useNavigation } from "@react-navigation/native";
import {useCollectionData} from "react-firebase-hooks/firestore";
import firebase from "firebase/compat/app";

const ShoppingCard = ({ navigation }) => {
    //see node belong to the user
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');


    const handAllItems = async () => {
        try {
            const snapshot = await firestore
                .collection('sellitems')
                .where('uid', '==', auth.currentUser.uid)
                .get();
            const items = snapshot.docs.map(doc => doc.data());
            setItems(items);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching all items:', error);
        }
    }
    useEffect(() => {
            handAllItems();

        }
        , []);
    const handleSearch = async () => {
        try {
            const snapshot = await firestore
                .collection('sellitems')
                .where('title', '>=', searchText)
                .where('title', '<=', searchText + '\uf8ff')
                .get();

            const firstResult = snapshot.docs[0].data();
            console.log('First Search Result:', firstResult);
        } catch (error) {
            console.error('Error performing search:', error);
        }
    }
    return (
        <SafeAreaView style={{flex: 1}}>
            <Bar backgroundColor={COLORS.primary}/>
            <View style={{flex: 1}}>
                <View style={{zIndex: 0}}>
                    <FlatList
                        data={items} // Provide a single item as data
                        renderItem={({item}) => (
                            <>
                                <FetchData data={item}/>
                                {ItemData.map((item) => (
                                    <Sellcard data={item} key={item.id.toString()}/>
                                ))}
                            </>
                        )}
                        keyExtractor={(item) => item.id.toString()}
                        showsVerticalScrollIndicator={false}
                        ListHeaderComponent={<Header onSearch={handleSearch}/>}
                    />
                </View>
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: -1,
                }}>
                    <View style={{height: 300, backgroundColor: COLORS.primary}}/>
                    <View style={{flex: 1, backgroundColor: COLORS.white}}/>
                </View>
            </View>
        </SafeAreaView>
    );
}
export default ShoppingCard;