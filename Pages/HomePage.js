
import React from 'react';
import {FlatList, SafeAreaView, View} from "react-native";
import {COLORS, ItemData} from "../constants/index";
import Bar from "../component/Bar";
import Header from "../component/Header";
import Sellcard from "../component/Sellcard";


export default function HomePage () {
    return (
        //import header
        <SafeAreaView style={{flex: 1}}>
        <Bar backgroundColor={COLORS.primary} />

                <View style={{flex: 1}}>
                    <View style={{zIndex:0}}>

               <FlatList
                   data={ItemData}
                   renderItem={({item}) => <Sellcard data={item} key={item.id.toString()}/>}
                   keyExtractor={(item) => item.id.toString()}
                   showsVerticalScrollIndicator={false}
                   ListHeaderComponent={<Header/>}
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
                            <View style={{flex: 1, backgroundColor: COLORS.green2}} />
                        </View>
            </View>

        </SafeAreaView>

    );
}

