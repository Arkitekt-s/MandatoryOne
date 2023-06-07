

    import React, {useEffect} from 'react';
    import MapView, {Marker} from 'react-native-maps';
    import {StyleSheet, Text, View} from 'react-native';
    import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
    import {GOOGLE_MAPS_API_KEY} from "@env";
    import {useNavigation} from "@react-navigation/native";
    import Geocoder from 'react-native-geocoding';
    const Googlemap = ({route}) => {
        const { location} = route.params;
        //By separating the shared functionality into a separate module, you can avoid the circular dependency and still have access to the required functionality in both components.
        // const { handleGoogleMapPress } = getLocation();
        let navigation = useNavigation();
        const [address, setAddress] = React.useState(''); // [latitude, longitude

    const [pin, setPin] = React.useState(null); // [latitude, longitude
    const [region, setRegion] = React.useState({
        latitude: 55.676098,
        longitude: 12.568337,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });
    const handleDragEnd = (e) => {
        console.log(e.nativeEvent.coordinate);
        setPin(e.nativeEvent.coordinate);
        setRegion((prevState) => {
            return {
                ...prevState,
                latitude: e.nativeEvent.coordinate.latitude,
                longitude: e.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            }
        }
        )
    }
        // const handleDragEnd = (e) => {
        //     const { latitude, longitude } = e.nativeEvent.coordinate;
        //     setAddress(`${latitude},${longitude}`);
        // };
        // save address



       const handleGoogleMapPress = (newAddress) => {
        console.log(newAddress);
        navigation.navigate('SellPage', {newAddress: newAddress});
        setAddress(newAddress);
       }









        return (
            <View style={styles.container}>
                {/*google search autocomplete*/}
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    //pass the address as a defult value
                    defaultValue={location}
                    fetchDetails={true}
                    GooglePlacesSearchQuery={{
                        rankby: 'distance',
                        region: 'dk',
                        type: 'address',

                    }}
                    //save locaton in state
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        setRegion({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        })
                        // setAddress(details.formatted_address);
                    }}


                    query={{
                        // key is in .env file
                        key : GOOGLE_MAPS_API_KEY,
                        language: 'en',
                        components: 'country:dk',
                        types: 'address',
                        radius: 30000,
                        input: location.toString(),
                        location: `${region.latitude},${region.longitude}`


                    }}
                    styles={{
                        container: {
                            flex: 0,position:'absolute',top:0,left:0,right:0,zIndex:1
                        },
                        listview: {
                            backgroundColor: 'white'
                        }

                    }}
                />

                {/*//denmark map*/}
             <MapView style={styles.map} initialRegion={{
                    latitude: 55.676098,
                    longitude: 12.568337,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                provider={"google"}
                      initialRegion={region}
                      provider="google"
                      zoomEnabled={true} // Enable zoom functionality
                      zoomControlEnabled={true}// Enable zoom control
                        zoomTapEnabled={true}


                >
                 {/*//marker*/}
                    <Marker coordinate={{
//
                        latitude: 55.676098,
                        longitude: 12.568337,
                    }
                    }
                    pinColor="black"
                            draggable={true}
                            title={"Copenhagen"}
                            description={"Capital of Denmark"}
                            onDragStart={(e) => console.log('onDragStart', e.nativeEvent.coordinates)}
                            onDrag={(e) => console.log('onDrag', e.nativeEvent.coordinates)}
                            onDragEnd={(e) => {
                                handleDragEnd(e);
                            }
                            }

                    />

                 {/*//save the address and comr back to the home page*/}
                    <Marker coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,

                    }
                    }
                            pinColor="blue"
                            draggable={true}
                            title={(region.latitude.toString() + "," + region.longitude.toString())}
                            description={"Save the address"}
                            onDragStart={(e) => console.log('onDragStart', e.nativeEvent.coordinates)}
                            onDrag={(e) => console.log('onDrag', e.nativeEvent.coordinates)}
                            onDragEnd={(e) => {
                                handleDragEnd(e);
                            }
                            }
                            onPress={() => {
                                navigation.goBack();
                                handleGoogleMapPress(region.latitude.toString() + "," + region.longitude.toString());
                            }}



                    />
                </MapView>

            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 10,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
        },
        map: {
            width: '100%',
            height: '100%',
        },

    });

   export default Googlemap;
