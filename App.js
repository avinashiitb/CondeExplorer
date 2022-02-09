import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Image } from 'react-native';
import Constants from 'expo-constants';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import RBSheet from 'react-native-raw-bottom-sheet';
import axios from 'axios';
import { List, Divider, Badge } from 'react-native-paper';
import { Fontisto,FontAwesome, Entypo, AntDesign, MaterialIcons } from '@expo/vector-icons';


const GOOGLE_PLACES_API_KEY = 'AIzaSyDrIC6rsoT9UnzH8N-3ZJJvEsyBAvxGle8';

const App = () => {
  const [regionCoords, setRegion] = useState({ lat: 37.78825, lng: -122.4324 });
  const [marker, setMarker] = useState({ lat: 37.78825, lng: -122.4324 });
  const [currentMarker, setCurrentMarker] = useState({});
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
  console.log(nearbyPOI);
  const _OnClick = (marker) => {
    setCurrentMarker(marker);
    refRBSheet.current.open()
  }

  const ratingStar = [];
  let ratingValue = currentMarker.rating;
  // if(rating && Object.keys(rating).length ){
  //    ratingValue = details.rating.rating;
  //    count = details.rating.count;
  // }
  for (let i = 0; i < 5; i++) {
    if (ratingValue - i >= 1) {
      ratingStar.push(<FontAwesome key={i} name="star" size={17} color={'#d4af37'} />);
    } else if (ratingValue - i < 1 && ratingValue - i > 0) {
      ratingStar.push(<FontAwesome name="star-half" size={17} color={'re#d4af37'} />);
    } else {
      ratingStar.push(<FontAwesome name="star-o" size={17} color={'#d4af37'} />);
    }

  }
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
            onPress={() => _OnClick(marker)}
            // icon={require('./restaurant.webp')}
          >
            {
              marker.category == "Restaurant" ? <Image source={require('./restaurant.webp')} style={{height: 40, width:35 }} />
              : marker.category == "Hotel" ? <Image source={require('./hotel.png')} style={{height: 40, width:35 }} />
                : <Image source={require('./store.png')} style={{height: 50, width: 40 }} />
            }
            {/* <Image source={require('./restaurant.webp')} style={{height: 50, width:50 }} /> */}
          </MapView.Marker>
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
            backgroundColor: "transparent",
            elevation: 15
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
        height={550}
      >
        {
          console.log(currentMarker.image)
        }
        {/* <Image source={{ uri: currentMarker.image }} style={styles.thumbnail} /> */}
        <Image
          style={styles.thumbnail}
          source={{
            uri: currentMarker.image
          }}
        />
        <List.Item
          title={currentMarker.name}
          description={currentMarker.type}
          left={props => <List.Icon {...props} icon={() => 
            currentMarker.category == "Hotel" ? <Fontisto name="hotel" size={24} color="black" /> :
            currentMarker.category == "Restaurant" ? <AntDesign name="rest" size={24} color="black" /> :
            <MaterialIcons name="design-services" size={24} color="black" /> 
      } />}
        />
        <Text style={{ paddingLeft: 10, paddingBottom: 10 }}> Rating: <Text style={{ paddingLeft: 40 }} >{currentMarker.rating} {ratingStar}</Text> </Text>
        <Divider />
        <View style={{ flexDirection: 'row', paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10 }}>
          <Badge style={{ marginRight: 10 }}>AD</Badge>
          <Badge style={{ marginRight: 10 }}>50 % OFF</Badge>
          <Badge style={{ marginRight: 10 }}>Below $500</Badge>
        </View>
        <Divider />
        <Text style={{ paddingTop: 10, paddingBottom: 10, paddingRight: 10, paddingLeft: 5 }}> <Entypo name="location-pin" size={24} color="black" /> {currentMarker.address} </Text>
        {/* <Text> {currentMarker?.price.currency} {currentMarker?.price.minprice} - {currentMarker?.price.maxprice} </Text> */}
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
  thumbnail: {
    // flex: 1,
    width: '100%',
    height: 300,
    resizeMode: 'cover'
  },
});

export default App;
