import React, { useEffect, useState } from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
import axios from 'axios';
import Dialog from 'react-native-dialog';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllNearbyRestaurants } from '../store/googleRestaurant';
import {
  fetchAllRedyRestaurants,
  fetchSingleRedyRestaurant,
} from '../store/redyRestaurant';

export default function Maps() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const googleRestaurant = useSelector((state) => {
    return state.googleRestaurant;
  });

  const redyRestaurant = useSelector((state) => {
    return state.redyRestaurant;
  });

  const [restaurantPlaceID, setRestaurantPlaceID] = useState('');
  const [visibleState, setVisibleState] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({});
  const [selectedRestaurant, setSelectedRestaurant] = useState(0);

  useEffect(() => {
    dispatch(fetchAllNearbyRestaurants());
    dispatch(fetchAllRedyRestaurants());
  }, []);

  // const getTableInfo = async () => {
  //   const { data } = await axios.get(
  //     "https://redy-capstone.herokuapp.com/api/restaurant"
  //   );
  //   const restaurantId = data.filter((place) => {
  //     if (place.name === dialogInfo.title) {
  //       console.log(place.id);
  //       return place;
  //     }
  //   });
  //   let selected = restaurantId[0].id;

  //   setSelectedRestaurant(selected);
  // };

  const handleFetchSingleRedyRestaurant = (restaurant) => {
    const selectedRedyRestaurant = redyRestaurant.filter((redyRestaurant) => {
      if (redyRestaurant.placeId === restaurant.place_id) {
        return restaurant;
      }
    });
    setSelectedRestaurant(selectedRedyRestaurant);
  };

  const handleRedirect = () => {
    setVisibleState(false);
    navigation.navigate('Single Restaurant', {
      selectedRestaurant,
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

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 40.714184,
          longitude: -74.006238,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {!googleRestaurant.length
          ? null
          : googleRestaurant.map((restaurant, index) => {
              if (
                redyRestaurant
                  .map((place) => place.placeId)
                  .includes(restaurant.placeId)
              ) {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      longitude: restaurant.longitude,
                      latitude: restaurant.latitude,
                    }}
                    pinColor="green"
                    title={restaurant.name}
                    onPress={() => {
                      handleFetchSingleRedyRestaurant(restaurant);
                      setDialogInfo({
                        title: restaurant.name,
                        rating: restaurant.ratings,
                        vicinity: restaurant.address,
                        price_level: restaurant.priceLevel,
                      });
                      setRestaurantPlaceID(restaurant.placeId);
                      setVisibleState(true);
                    }}
                  />
                );
              } else {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      longitude: restaurant.longitude,
                      latitude: restaurant.latitude,
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
          {redyRestaurant
            .map((place) => place.placeId)
            .includes(restaurantPlaceID) ? (
            <Dialog.Button
              label="Reserve Now"
              onPress={() => {
                handleRedirect();
              }}
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
