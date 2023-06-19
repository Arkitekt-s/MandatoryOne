



import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput ,Image} from 'react-native';
import {COLORS, SIZES} from "../constants/index";
import { useNavigation } from "@react-navigation/native";
import { auth,firestore } from "../Config/FirebaseConfig";
import ShoppingCard from "./ShoppingCard";

const Header = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');

    const handleSellItem = () => {
        navigation.navigate('SellPage');
    };

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
    };
    //show shopping cart




    return (

        <View style={styles.container}>

            <Text style={styles.text}>Welcome {auth.currentUser.uid.slice(0, 3)}</Text>
            {/*shopping card*/}


            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity onPress={handleSellItem} style={styles.button}>
                        <Text style={styles.buttonText}>Sell Item</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonWrapperSearch}>
                    <Image
                        source={require('../assets/icons/search.png')}
                        style={styles.searchIcon}
                    />
                    <TextInput
                        style={styles.buttonSearch}
                        placeholder="Search"
                        // picture in placeholder
                        onChangeText={setSearchText}
                        onSubmitEditing={handleSearch}
                        value={searchText}
                    />
                </View>


            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: SIZES.large,
        textAlign: 'center',
        marginBottom: 20,
    },
    cardIcon: {
        width: 30,
        height: 30,
        position: 'absolute',
        right: 0,
        top: 0,
    },
    searchIcon: {
        width: 20,
        height: 20,
        position: 'absolute',
        left: 5,
        top: 25,

    },
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonWrapper: {
        flex: 1,
        alignItems: 'center'
    },
    buttonWrapperSearch: {
        flex: 2,
        alignItems: 'center',

    },
    buttonSearch: {
        backgroundColor: COLORS.yellow,
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        marginBottom: 50,
        marginTop: 10,
        borderWidth: 1,
    },
    button: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 50,
        marginBottom: 50,
        marginTop: 10,
        borderWidth: 1,
        borderColor: COLORS.secondary,
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: SIZES.medium,
        textAlign: 'center',

    },
    searchImage: {
        width: 20,
        height: 20,
        position: 'absolute',
    }
});

export default Header;


