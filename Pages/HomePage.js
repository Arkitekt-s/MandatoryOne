
import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, View} from "react-native";
import {COLORS, ItemData} from "../constants/index";
import Bar from "../component/Bar";
import Header from "../component/Header";
import Sellcard from "../component/Sellcard";
import FetchData from "../component/FetchData";
import {  firestore} from "../Config/FirebaseConfig";
import {useNavigation} from "@react-navigation/native";


export default function HomePage () {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
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


        <SafeAreaView style={{flex: 1}}>
        <Bar backgroundColor={COLORS.primary} />
                <View style={{flex: 1}}>
                    <View style={{zIndex:0}}>

                        <FlatList
                            data={[{ id: 1 }]} // Provide a single item as data
                            renderItem={({ item }) => (
                                <>
                                    <FetchData data={item} />
                                    {ItemData.map((item) => (
                                        <Sellcard data={item} key={item.id.toString()} />
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
                            <View style={{height: 300, backgroundColor: COLORS.primary}} />
                            <View style={{flex: 1, backgroundColor: COLORS.white}} />
                        </View>
            </View>

        </SafeAreaView>

    );
}

