import { View, Text, Image, StyleSheet } from "react-native";
import React, { useState } from "react";

import CustomInput from "../CustomComponents/CustomInput";
import CustomButton from "../CustomComponents/CustomButton";
// import {auth} from '../firebase'
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const navigation = useNavigation();

  const handleSignUp = () => {
    // auth.createUserWithEmailAndPassword(email, password)
    // .then(userCredentials => {
    //   const user = userCredentials.user;
    // })
    // .catch(error => {alert(error.message)})
  };

  const onSignInPressed = () => {
    console.warn("Sign In");
  };

  const onForgotPasswordPressed = () => {
    console.warn("Forgot Password");
  };

  const onCreateUserPressed = () => {
    console.warn("Create User Account");
    navigation.navigate("Sign Up User");
  };

  const onCreateBusinessPressed = () => {
    console.warn("Create Business Account");
    navigation.navigate("Sign Up Business");
  };

  return (
    <View style={styles.logotitle}>
      <Text style={styles.title}>Create an Account</Text>

      {/* <CustomInput
        inputField = {'Username'}
        value = {username}
        setValue = {setUsername}
        secureTextEntry = {false}
        />

        <CustomInput
        inputField = {'Email'}
        value = {email}
        setValue = {setEmail}/>

      <CustomInput
        inputField = {'Password'}
        value = {password}
        setValue = {setPassword}
        secureTextEntry = {true}/>

      <CustomInput
        inputField = {'Re-type Password'}
        value = {passwordRepeat}
        setValue = {setPasswordRepeat}
        secureTextEntry = {true}/> */}
      <Text style={styles.termsOfUse}>
        Please choose what type of account you would like to create, User or a
        Business Account?
      </Text>
      <CustomButton
        text="User"
        // onPress={handleSignUp}
        onPress={onCreateUserPressed}
      />
      <CustomButton
        text="Business Account"
        // onPress={handleSignUp}
        onPress={onCreateBusinessPressed}
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
