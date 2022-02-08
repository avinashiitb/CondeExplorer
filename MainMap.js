import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React from "react";

const initialRegion = {
    latitude: 18.516370,
    longitude: 73.857033,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
};

export default function MainMap() {
    return (
        <View>
            <MapView
                style={styles.map}
                region={initialRegion}
            >
            </MapView>
        </View>
    )
};

const styles = StyleSheet.create({
    map: {
      position: 'absolute',
      marginTop: 20,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }, 
  });