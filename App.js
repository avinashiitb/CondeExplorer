import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';

const GOOGLE_PLACES_API_KEY = 'AIzaSyDrIC6rsoT9UnzH8N-3ZJJvEsyBAvxGle8';

const App = () => {
  const [regionCoords, setRegion] = useState({ lat: 37.78825, lng: -122.4324 });
  const [marker, setMarker] = useState({ lat: 37.78825, lng: -122.4324 });
  const refRBSheet = useRef();

  const onPress = (data, details) => {
    fetchAllNearbyPOI(details.geometry.location.lat, details.geometry.location.lng);
    setRegion(details.geometry.location);
    setMarker(details.geometry.location);
  };
  const [nearbyPOI, setNearbyPOI] = useState([]);

  const fetchAllNearbyPOI = async (lat, lng) => {
    const response = await axios.get(
      `http://placesapi-env-1.eba-g2hb9s5e.us-east-1.elasticbeanstalk.com/api/places/getAllNearByPOI?lat=${lat}&long=${lng}`
    );
    setNearbyPOI(response.data);
  };

  const _OnClick = () => (
    refRBSheet.current.open()
  )
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: regionCoords.lat,
          longitude: regionCoords.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {nearbyPOI?.data?.map((marker, key) => (

          <MapView.Marker
            key={key}
            coordinate={{ latitude: marker.location.coordinates[0], longitude: marker.location.coordinates[1] }}
            title={marker.name}
            onPress={() => _OnClick()}
          />
        ))}
      </MapView>

      <GooglePlacesAutocomplete
        styles={{
          textInputContainer: {
            width: "90%",
            top: 30,
            alignSelf: 'center'
          },
          textInput: {
            borderColor: '#1faadb',
            borderWidth: 1,
            borderRadius: 5,
            height: 48,
            paddingBottom: 8,
            color: '#000000',
            fontSize: 16,
          },
          predefinedPlacesDescription: {
            color: '#1faadb',
          },
        }}
        placeholder="Search"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en', // language of the results
        }}
        GooglePlacesDetailsQuery={{
          fields: 'geometry',
        }}
        fetchDetails={true}
        onPress={onPress}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
      />

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
        height={600}
      >
        <Text>Text</Text>
      </RBSheet>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
  },
});

export default App;
