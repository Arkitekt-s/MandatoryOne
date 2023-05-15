import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {SIZES} from "../constants/index";
import SellPage from "../Pages/SellPage";
import {useNavigation} from "@react-navigation/native";

const Header = () => {
    let navigation = useNavigation();
    const handleSellItem = () => {
        navigation.navigate('SellPage');
    };



    return (
        <View>
            {/*//sell item move to sell page*/}
            <TouchableOpacity onPress={handleSellItem}
                style={{backgroundColor: 'white', borderRadius: 20, margin: 20, padding: 20
                    , alignItems: 'center', justifyContent: 'center', width: 100, height: 80
            ,COLORS: '#F1F1E6', borderWidth: 1, borderColor: '#00A1F2'}}>
                <Text style={{color: 'black', fontWeight: 'bold',fontSize: SIZES.medium ,textAlign: 'center'}}>Sell Item</Text>
            </TouchableOpacity>



        </View>
    );
};

export default Header;
