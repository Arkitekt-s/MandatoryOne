import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, TextInput, Image, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { auth, firestore } from '../Config/FirebaseConfig';
import { COLORS, SIZES } from '../constants/index';

const Header = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');

    const handleSellItem = () => {
        navigation.navigate('SellPage');
    };
    const handelUserCard = () => {
        navigation.navigate('UserCart');
    }

    const handleSearch = async () => {
        try {

            const snapshot = await firestore
                .collection('sellitems')
                .where('title', '>=', searchText)
                .where('title', '<=', searchText + '\uf8ff')
                .get();


            if (snapshot.docs.length > 0) {
                const firstResult = snapshot.docs[0].data();
                console.log('First Search Result:', firstResult);
                Alert.alert('Search Results',
                    `Result: ${firstResult.title}
                    \n Price: ${firstResult.priceSuggestions}
                    \n Description: ${firstResult.description}`);



            } else {
                console.log('No search results found.');
                Alert.alert('No Results', 'No items matching your search query were found.');
            }
        } catch (error) {
            console.error('Error performing search:', error);
            Alert.alert('Error', 'An error occurred while performing the search.');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome {auth.currentUser.uid.slice(0, 3)}</Text>
            {/* Shopping cart */}

            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity onPress={handleSellItem} style={styles.button}>
                        <Text style={styles.buttonText}>Sell Item</Text>
                    </TouchableOpacity>
                </View>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity onPress={handelUserCard} style={styles.button}>
                            <Text style={styles.buttonText}> A Card</Text>
                        </TouchableOpacity>
                    </View>
                <View style={styles.buttonWrapperSearch}>
                    <Image source={require('../assets/icons/search.png')} style={styles.searchIcon} />
                    <TextInput
                        style={styles.buttonSearch}
                        placeholder="Search"
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
        alignItems: 'center',
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
    },
});

export default Header;
