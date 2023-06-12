
import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const GoogleMapComponent = ({ route }) => {
    const { lat, lng } = route.params;

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: parseFloat(lat),
                    longitude: parseFloat(lng),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: parseFloat(lat),
                        longitude: parseFloat(lng),
                    }}
                    title="Item location"
                    description="Pick the item in this location"
                />
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

export default GoogleMapComponent;


