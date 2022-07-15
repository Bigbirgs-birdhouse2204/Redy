import { View, Text, Image, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";

import CustomInput from "../CustomComponents/CustomInput";
import CustomButton from "../CustomComponents/CustomButton";
// import {auth} from '../firebase'
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();

  const onCreateUserPressed = () => {
    navigation.navigate("Sign Up User");
  };

  const onCreateBusinessPressed = () => {
    navigation.navigate("Sign Up Business User");
  };

  function tempBusinessClosure() {
    Alert.alert("Sorry, We're not accepting business users at this time.");
    navigation.navigate("Sign In");
  }

  return (
    <View style={styles.logotitle}>
      <Text style={styles.title}>Create an Account</Text>
      <Text style={styles.termsOfUse}>
        Please choose what type of account you would like to create, User or a
        Business Account?
      </Text>
      <CustomButton
        text="User Account"
        // onPress={handleSignUp}
        onPress={onCreateUserPressed}
      />
      <CustomButton
        text="Business Account"
        // onPress={handleSignUp}
        onPress={tempBusinessClosure}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logotitle: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 150,
    paddingHorizontal: 20,
  },
  termsOfUse: {
    color: "gray",
    marginVertical: 10,
  },
  title: {
    marginTop: 30,
    fontSize: 24,
    fontWeight: "bold",
  },
});
export default SignUpScreen;
