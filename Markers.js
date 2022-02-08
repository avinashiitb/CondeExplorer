import { StyleSheet, Text, View, SafeAreaView, Image, TextInput } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import React from "react";

export default function Markers()
{
    return (
        <View>
        <MapView.Marker
          coordinate={{
            latitude: 18.537473,
            longitude: 73.843643,
          }}
          title={"Location"}
        >
          <Image source={require('./2.png')} style={{ height: 35, width: 35 }} />
        </MapView.Marker>
        <MapView.Marker
          coordinate={{
            latitude: 18.523801,
            longitude: 73.867022,
          }}
          title={"Location"}
        />
        <MapView.Marker
          coordinate={{
            latitude: 18.515011,
            longitude: 73.861182,
          }}
          title={"Location"}
        />
        </View>
    )
}