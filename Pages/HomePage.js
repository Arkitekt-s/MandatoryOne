
import React from 'react';
import {FlatList, SafeAreaView, View} from "react-native";
import {COLORS, NFTData} from "../constants/index";
import Bar from "../component/Bar";
import Header from "../component/Header";
import NFTcard from "../component/NFTcard";

export default function HomePage () {
    return (
        //import header
        <SafeAreaView style={{flex: 1}}>
        <Bar backgroundColor={COLORS.primary} />

                <View style={{flex: 1}}>
                    <View style={{zIndex:0}}>

               <FlatList
                   data={NFTData}

                   renderItem={({item}) => <NFTcard data={item} key={item.id.toString()}/>}
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

