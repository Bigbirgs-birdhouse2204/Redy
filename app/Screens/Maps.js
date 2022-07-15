
import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Dialog from "react-native-dialog";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-native-paper";
import { fetchAllNearbyRestaurants } from "../store/googleRestaurant";
import {
  fetchAllRedyRestaurants,
  fetchSingleRedyRestaurant,
} from '../store/redyRestaurant';

const RedyLogo = require('../assets/Redy.png')
export default function Maps(props) {
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

  const pinColor = 'blue';

  useEffect(() => {
    dispatch(fetchAllNearbyRestaurants());
    dispatch(fetchAllRedyRestaurants());

  }, []);

  const handleFetchSingleRedyRestaurant = (restaurant) => {
    const selectedRedyRestaurant = redyRestaurant.filter((redyRestaurant) => {
      if (redyRestaurant.placeId === restaurant.placeId) {
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
                  .map((place, index) => place.placeId)
                  .includes(restaurant.placeId)
              ) {
                if (redyRestaurant[redyRestaurant.findIndex(redy => redy.placeId === googleRestaurant[index].placeId)].diningTables.length > 3){

                return (
                  <Marker
                    key={index}
                    coordinate={{
                      longitude: restaurant.longitude,
                      latitude: restaurant.latitude,
                    }}
                    // image={RedyLogo}
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
                  >
                    {/* <Image
                      source={RedyLogo}
                      style={{
                        width: 28,
                        height: 28,
                      }}
                      resizeMode="contain"
  /> */}
                  </Marker>
                );
              } else if (redyRestaurant[redyRestaurant.findIndex(redy => redy.placeId === googleRestaurant[index].placeId)].diningTables.length > 0){
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      longitude: restaurant.longitude,
                      latitude: restaurant.latitude,
                    }}
                    pinColor="yellow"
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
            } else if (redyRestaurant[redyRestaurant.findIndex(redy => redy.placeId === googleRestaurant[index].placeId)].diningTables.length === 0) {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    longitude: restaurant.longitude,
                    latitude: restaurant.latitude,
                  }}
                  pinColor="red"
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
            }
              } else {
                return (
                  <Marker
                    key={index}
                    coordinate={{
                      longitude: restaurant.longitude,
                      latitude: restaurant.latitude,
                    }}
                    pinColor={pinColor}

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
      <View
              style={{
                position: 'absolute',//use absolute position to show button on top of the map
                top: '75%', //for center align
                right: '5%', //for center align
                alignSelf: 'flex-end', //for align to right,
                zIndex: 2,
                elevation: 2,
                backgroundColor: 'white',
                height: 150,
                width: 100,
            }}
      >
        <View
        style={{


        }}
        >

        </View>
        <View
        style={{
          flexDirection: 'row'
        }}
        >
        <View
style={{
  height: 20,
  width: 20,
  backgroundColor: 'green',

}}
/>
<Text
style={{fontSize: 10}}
>3+ Open Tables</Text>
</View>
  <View
        style={{
          flexDirection: 'row'
        }}
        >
        <View
style={{
  height: 20,
  width: 20,
  backgroundColor: 'yellow',

}}
/>
<Text
style={{fontSize: 10}}
>Few Tables Left</Text>
</View>
<View
style={{
  flexDirection: 'row'
}}
>
<View
style={{
height: 20,
width: 20,
backgroundColor: 'red',
}}
/>
<Text
style={{fontSize: 10}}
>Tables Booked up; Join WaitList</Text>
</View>
<View
        style={{
          flexDirection: 'row'
        }}
        >
 <View
style={{
  height: 20,
  width: 20,
  backgroundColor: 'blue',
}}
/>
<Text
style={{fontSize: 10}}
>Not w/ Redy</Text>
  </View>


      </View>
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
  }
});
