import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getOwnerRestaurants, logout } from "../store";
import CustomButton from "../CustomComponents/CustomButton";

import text from "../CustomComponents/Text";

const BusinessReservations = ({ navigation }) => {
  const { owner: restaurant } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  // const getRestaurantInfo = async () => {
  //   const { data } = await axios.get(
  //     'https://redy-capstone.herokuapp.com/api/restaurant'
  //   );
  //   const restaurantId = data.filter((place) => {
  //     if (place.name === dialogInfo.title) {
  //       console.log(place.id);
  //       return place;
  //     }
  //   });
  //   let selected = restaurantId[0].id;

  //   setSelectedRestaurant(selected);

  //   // data.filter(restaurant => )

  //   console.log('THIS IS RESTAURANT ID', selected);
  //   // const { data } = await axios.get('/api/table/restaurant/:id');
  // };

  const handleRedirect = (restaurant) => {
    navigation.navigate("Single Reservation Business", restaurant);
  };

  useEffect(() => {
    dispatch(getOwnerRestaurants());
  }, []);

  return (
    <SafeAreaView>
      <Text
        style={{
          fontSize: 40,
          textAlign: "center",
          fontFamily: text.primaryFont,
        }}
      >
        See Reservations
      </Text>
      {!restaurant.length ? (
        <Text style={{ fontFamily: text.primaryFont }}>
          You don't have Restaurants to manage. Please add a Restaurant
        </Text>
      ) : (
        restaurant.map((restaurant, i) => (
          <CustomButton
            key={i}
            text={`${restaurant.name}`}
            onPress={() => handleRedirect(restaurant)}
          />
        ))
      )}
      <Button
        style={{ bottom: 20 }}
        title="Back to Home"
        onPress={() => navigation.navigate("Home")}
      />
    </SafeAreaView>
  );
};

export default BusinessReservations;

const styles = StyleSheet.create({});
