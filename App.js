import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React from "react";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MainMap from './MainMap';
import Markers from './Markers';


export default function App() {
  return (
    <View style={styles.container}>
      <MainMap>
        <Markers/>
        </MainMap>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
