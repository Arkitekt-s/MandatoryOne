



import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { COLORS, SIZES } from "../constants/index";
import { useNavigation } from "@react-navigation/native";
import { auth,firestore } from "../Config/FirebaseConfig";

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


    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome {auth.currentUser.uid.slice(0, 3)}</Text>
            <View style={styles.buttonContainer}>
                <View style={styles.buttonWrapper}>
                    <TouchableOpacity onPress={handleSellItem} style={styles.button}>
                        <Text style={styles.buttonText}>Sell Item</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonWrapper}>
                    <TextInput
                        style={styles.button}
                        placeholder={'Search'}
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
    buttonContainer: {
        flexDirection: 'row',
    },
    buttonWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 100,
        height: 50,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#00A1F2',
    },
    buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: SIZES.medium,
        textAlign: 'center',
    },
});

export default Header;


