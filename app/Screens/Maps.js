import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import axios from "axios";
import Dialog from "react-native-dialog";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllNearbyRestaurants } from "../store/googleRestaurant";

export default function Maps() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { googleRestaurant } = useSelector((state) => {
    return state;
  });

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [restaurantPlaceID, setRestaurantPlaceID] = useState("");
  const [visibleState, setVisibleState] = useState(false);
  const [dialogInfo, setDialogInfo] = useState({});
  const [placeIdArr, setPlaceIdArr] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(0);

  useEffect(() => {
    //hard coded temporarily to mock current location to downtown manhatten
    // const lat = 40.714184;
    // const long = -74.006238;
    // setLocation(Location.getCurrentPositionAsync({}));
    console.log("thisisgoogleRestaurant", googleRestaurant);
    dispatch(fetchAllNearbyRestaurants(lat, long));
  }, []);

  // const redyRestaurantPlaceIds = async () => {
  //   const { data } = await axios.get(
  //     "https://redy-capstone.herokuapp.com/api/restaurant"
  //   );
  //   const Idarr = data.map((place) => place.placeId);
  //   setPlaceIdArr(Idarr);
  //   // console.log('THIS IS DATA', Idarr);
  //   //  return data.map(place => place.placeId)
  // };

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

  const handleRedirect = () => {
    getTableInfo();
    setVisibleState(false);
    navigation.navigate("Single Restaurant", {
      dialogInfo,
      selectedRestaurant,
    });
  };

  const handleConversion = (priceLevel) => {
    if (dialogInfo.price_level == 1) {
      return "$";
    } else if (dialogInfo.price_level == 2) {
      return "$$";
    } else if (dialogInfo.price_level == 3) {
      return "$$$";
    } else {
      return "";
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
                        title: "This Restaurant is not on Redy",
                        rating: "N/A",
                        vicinity: "N/A",
                        price_level: "N/A",
                        button1: {
                          label: "Go Back",

                          onPress: () => {
                            setVisibleState(false);
                          },
                        },
                        button2: {
                          label: "Go Back",

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
              {"\n"}
              Rating: {dialogInfo.rating}
              {"\n"}
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
