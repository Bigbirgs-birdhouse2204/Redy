import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Button,
} from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { logout } from "../store";
import CustomButton from "../CustomComponents/CustomButton";

const Home = ({ navigation }) => {
  const { auth } = useSelector((state) => {
    return state;
  });
  const dispatch = useDispatch();

  const logOutTest = async () => {
    try {
      dispatch(logout(navigation));
    } catch (err) {
      console.log(err);
    }
  };

  const onBookNowPressed = () => {
    navigation.navigate("Maps");
  };
  const onManageBusiness = () => {
    navigation.navigate("Manage Business");
  };

  const onManageReservations = () => {
    navigation.navigate('See Reservations');
  };

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Image style={styles.logo} source={require("../assets/Redy.png")} />

      <CustomButton
        text="Book Now!"
        style={styles.button}
        onPress={onBookNowPressed}
      />
      {!auth.isOwner ? null : (
        <>
        <CustomButton text="Manage Businesses" onPress={onManageBusiness} />
        <CustomButton text="See Reservations" onPress={onManageReservations} />
        </>
      )}
      <CustomButton text="Sign Out" onPress={logOutTest} />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 150,
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    position: "absolute",
    top: 100,
  },
});
