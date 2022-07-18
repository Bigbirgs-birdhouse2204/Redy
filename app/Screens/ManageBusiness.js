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

import appFont from '../CustomComponents/Text.js'

const ManageBusiness = ({ navigation }) => {
  const { owner: restaurant } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const onAddRestaurantPressed = () => {
    navigation.navigate("Add Restaurant");
  };


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
            fontFamily: appFont.primaryFont,
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
