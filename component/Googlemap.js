



    import React from 'react';
    import MapView, {Marker} from 'react-native-maps';
    import { StyleSheet, View } from 'react-native';
    import {GooglePlacesAutocomplete} from "react-native-google-places-autocomplete";
    import {GOOGLE_MAPS_API_KEY} from "@env";

const Googlemap = () => {
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
        return (
            <View style={styles.container}>
                {/*google search autocomplete*/}
                <GooglePlacesAutocomplete
                    placeholder='Search'
                    fetchDetails={true}
                    GooglePlacesSearchQuery={{
                        rankby: 'distance'
                    }}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        setRegion({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421
                        })
                    }}

                    query={{
                        // key is in .env file
                        key : GOOGLE_MAPS_API_KEY,
                        language: 'en',
                        components: 'country:dk',
                        types: 'address',
                        radius: 30000,
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
                     {/*//add more marker*/}
                  <Marker coordinate={{
                        latitude: region.latitude,
                        longitude: region.longitude,
                    }}
                            pinColor="blue"
                            draggable={true}
                          //zoom out to see the pin
                            title={"New Pin"}
                            description={"New Pin Discription"}


                            // title is address of the marker
                            onDragStart={(e) => console.log('onDragStart', e.nativeEvent.coordinates)}
                            onDrag={(e) => console.log('onDrag', e.nativeEvent.coordinates)}
                            onDragEnd={(e) => {
                                console.log('onDragEnd', e.nativeEvent.coordinates);
                                setPin(e.nativeEvent.coordinate);
                            }
                            }
                    />
                </MapView>
            </View>
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: 50,
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
