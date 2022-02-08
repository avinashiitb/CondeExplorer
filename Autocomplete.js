import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import { StyleSheet, Text, View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const GOOGLE_PLACES_API_KEY = 'AIzaSyDrIC6rsoT9UnzH8N-3ZJJvEsyBAvxGle8';

export default function Autocomplete() {
  
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search"
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: 'en', // language of the results
        }}
        onPress={(data, details = null) => {
          console.log(data);
        var config = {
          method: 'get',
          url: 'https://maps.googleapis.com/maps/api/place/details/json?place_id='+data.place_id+'&fields=name%2Crating%2Cformatted_phone_number%2Cgeometry&key='+GOOGLE_PLACES_API_KEY,
          headers: { }
        };
        fetch(config.url, { mode: 'no-cors'})
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
        }}
        onFail={(error) => console.error(error)}
        requestUrl={{
          url:
            'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
          useOnPlatform: 'web',
        }} // this in only required for use on the web. See https://git.io/JflFv more for details.
        currentLocation={true}
        currentLocationLabel='Current location'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: '#ecf0f1',
  },
});