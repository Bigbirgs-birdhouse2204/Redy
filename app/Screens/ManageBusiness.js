import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getOwnerRestaurants, logout } from "../store";
import CustomButton from "../CustomComponents/CustomButton";

const ManageBusiness = ({ navigation }) => {
  const { owner: restaurant } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  //logout button
  // const logOutTest = async () => {
  //   try {
  //     dispatch(logout(navigation));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const onAddRestaurantPressed = () => {
    navigation.navigate("Add Restaurant");
  };

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
    navigation.navigate('Edit Restaurant',
      restaurant,
    );
  };

  useEffect(() => {
    dispatch(getOwnerRestaurants());
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <Text
          style={{
            fontSize: 40,
            textAlign: "center",
            fontFamily: "Times New Roman",
          }}
        >
          Manage Businesses
        </Text>
        <View style={styles.buttonContainer}>

          {!restaurant.length ? (
            <Text>
              You don't have Restaurants to manage. Please add a Restaurant{" "}
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
        </View>
        <Button
          style={{ bottom: 20 }}
          title="Back to Home"
          onPress={() => navigation.navigate("Home")}
        />
        {/* <CustomButton text="Sign Out" onPress={logOutTest} /> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ManageBusiness;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 30,
  },
});
