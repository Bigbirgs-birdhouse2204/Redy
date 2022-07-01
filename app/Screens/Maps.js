import * as React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';


export default function Maps() {

const [pin, setPin] = React.useState({longitude: -96.10110953450203, latitude: 33.64545041829775})

const [location, setLocation] = React.useState(null);
const [errorMsg, setErrorMsg] = React.useState(null);



React.useEffect(() => {
  (async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    console.log(location)

    setPin({
       latitude: location.coords.latitude,
       longitude: location.coords.longitude,
      })
  })();
}, []);


return (
  <View style={styles.container}>
    <MapView style={styles.map}
    provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 40.6884810235732,
          longitude: -73.825052026728,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}>
        <Marker
         coordinate={pin}
         title="Test Title"
         description='Test Description'
         pinColor='green'
         ></Marker>
         </MapView>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  alignItems: 'center',
  justifyContent: 'center',
},
map: {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
},
});


