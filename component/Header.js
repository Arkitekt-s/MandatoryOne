import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {COLORS, SIZES} from "../constants/index";
import SellPage from "../Pages/SellPage";
import {useNavigation} from "@react-navigation/native";
import {auth} from "../Config/FirebaseConfig";

const Header = () => {
    const navigation = useNavigation();
    const handleSellItem = () => {
        navigation.navigate('SellPage');
    };



    return (
        <View>
            {/* Text component */}
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: SIZES.medium, textAlign: 'center' }}>
                Welcome {auth.currentUser.uid.slice(0, 5)}
            </Text>
            {/*//sell item move to sell page*/}
            <TouchableOpacity onPress={handleSellItem}
                style={{backgroundColor: 'white', borderRadius: 20, margin: 20, padding: 10
                    , alignItems: 'center', justifyContent: 'center', width: 100, height: 50
            ,COLORS: '#F1F1E6', borderWidth: 1, borderColor: '#00A1F2'}}>
                <Text style={{color: 'black', fontWeight: 'bold',fontSize: SIZES.medium ,textAlign: 'center'}}>Sell Item</Text>
            </TouchableOpacity>


            {/*//in front of that its text*/}

        </View>
    );
};

export default Header;
