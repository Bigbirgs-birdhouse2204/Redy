import * as React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import Dialog from 'react-native-dialog';
import { useNavigation } from '@react-navigation/native';

export default function Maps() {
  const [pin, setPin] = React.useState({
    longitude: -96.10110953450203,
    latitude: 33.64545041829775,
  });

  const navigation = useNavigation();

  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState([]);
  const [restaurantPlaceID, setRestaurantPlaceID] = React.useState('');
  const [visibleState, setVisibleState] = React.useState(false);
  const [dialogInfo, setDialogInfo] = React.useState({});
  const [placeIdArr, setPlaceIdArr] = React.useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = React.useState(0);

  const redyRestaurantPlaceIds = async () => {
    const { data } = await axios.get(
      'https://redy-capstone.herokuapp.com/api/restaurant'
    );
    const Idarr = data.map((place) => place.placeId);
    setPlaceIdArr(Idarr);
    // console.log('THIS IS DATA', Idarr);
    //  return data.map(place => place.placeId)
  };

  const getTableInfo = async () => {
    const { data } = await axios.get(
      'https://redy-capstone.herokuapp.com/api/restaurant'
    );
    const restaurantId = data.filter((place) => {
      if (place.name === dialogInfo.title) {
        console.log(place.id);
        return place;
      }
    });
    let selected = restaurantId[0].id;
    // console.log('THIS IS SELECTED', selected);
    setSelectedRestaurant(selected);

    // data.filter(restaurant => )

    // console.log('THIS IS RESTAURANT ID', selected);
    // const { data } = await axios.get('/api/table/restaurant/:id');
  };

  // console.log(redyRestaurantPlaceIds())
  const handleRedirect = () => {
    getTableInfo();
    setVisibleState(false);
    navigation.navigate('Single Restaurant', {
      dialogInfo,
      selectedRestaurant,
    });
  };

  const findRestaurantsNearby = async (latitude, longitude) => {
    const lat = 40.714184;
    const long = -74.006238;
    var config = {
      method: 'get',
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=1609&type=restaurant&key=AIzaSyC-OSdHQCLsDAV0CgpJIY7DSMRnPxEkGJ0`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        // console.log(response.data.results);
        setRestaurants(response.data.results);
        JSON.stringify(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleConversion = (priceLevel) => {
    if (dialogInfo.price_level == 1) {
      return '$';
    } else if (dialogInfo.price_level == 2) {
      return '$$';
    } else if (dialogInfo.price_level == 3) {
      return '$$$';
    } else {
      return '';
    }
  };

  React.useEffect(() => {
    let latitude;
    let longitude;
    (async () => {
      redyRestaurantPlaceIds();
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
      // console.log(location);
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      await findRestaurantsNearby(latitude, longitude);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 40.6884810235732,
          longitude: -73.825052026728,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {!restaurants.length
          ? null
          : restaurants.map((restaurant, index) => {
              if (placeIdArr.includes(restaurant.place_id)) {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      longitude: restaurant.geometry.location.lng,
                      latitude: restaurant.geometry.location.lat,
                    }}
                    pinColor="green"
                    title={restaurant.name}
                    onPress={() => {
                      setDialogInfo({
                        title: restaurant.name,
                        rating: restaurant.rating,
                        vicinity: restaurant.vicinity,
                        price_level: restaurant.price_level,
                        // button1: {
                        //   label: "Go Back",
                        // onPress: () => {
                        //   setVisibleState(false);
                        //   },
                        // },
                        // button2: {
                        //   label: "Reserve Now",
                        // onPress: () => {
                        //   handleRedirect();
                        //   },
                        // },
                      });
                      setRestaurantPlaceID(restaurant.place_id);
                      setVisibleState(true);
                      console.log(restaurant);
                    }}
                  />
                );
              } else {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      longitude: restaurant.geometry.location.lng,
                      latitude: restaurant.geometry.location.lat,
                    }}
                    pinColor="wheat"
                    title={restaurant.name}
                    onPress={() => {
                      setDialogInfo({
                        title: 'This Restaurant is not on Redy',
                        rating: 'N/A',
                        vicinity: 'N/A',
                        price_level: 'N/A',
                        button1: {
                          label: 'Go Back',
                          onPress: () => {
                            setVisibleState(false);
                          },
                        },
                        button2: {
                          label: 'Go Back',
                          onPress: () => {
                            setVisibleState(false);

                            // handleRedirect();
                          },
                        },
                      });
                      setVisibleState(true);
                      console.log({
                        name: restaurant.name,
                        address: restaurant.vicinity,
                        ratings: restaurant.rating,
                        priceLevel: restaurant.price_level,
                        placeId: restaurant.place_id,
                        totalUserRatings: restaurant.user_ratings_total,
                        imgUrl: restaurant.photos[0].photo_reference,
                        longitude: restaurant.geometry.location.lng,
                        latitude: restaurant.geometry.location.lat,
                      });
                    }}
                  />
                );
              }
            })}
      </MapView>
      <View>
        <Dialog.Container visible={visibleState}>
          <Dialog.Title>{dialogInfo.title}</Dialog.Title>
          <Dialog.Description>
            <Text>
              Address: {dialogInfo.vicinity}
              {'\n'}
              Rating: {dialogInfo.rating}
              {'\n'}
              Price Level: {handleConversion(dialogInfo.price_level)}
            </Text>
          </Dialog.Description>
          <Dialog.Button
            label="Go Back"
            onPress={() => setVisibleState(false)}
          />
          {placeIdArr.includes(restaurantPlaceID) ? (
            <Dialog.Button
              label="Reserve Now"
              onPress={() => handleRedirect()}
            />
          ) : null}
        </Dialog.Container>
      </View>
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
