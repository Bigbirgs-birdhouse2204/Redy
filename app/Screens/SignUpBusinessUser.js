import { View, Text, Image, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import CustomInput from "../CustomComponents/CustomInput";
import CustomButton from "../CustomComponents/CustomButton";
import { authenticate } from "../store";

const SignUpBusinessUser = ({ navigation }) => {
  // Local State:
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  // UseDispaych Hook:
  const dispatch = useDispatch()

  const signUpTest = async () => {
    try {
      let formData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLocaleLowerCase().trim(),
        password,
        phone: phoneNumber.trim(),
      };
      // const res = await axios.post(
      //   `https://redy-capstone.herokuapp.com/auth/business/signup`,
      //   formData
      // );
      dispatch(authenticate(formData, 'business/signup', navigation, "Sign In"))

      // return dispatch(setAuth({ error: authError }));
      // navigation.navigate("Sign In");
      // return res.data;
      return;
    } catch (authError) {
      return authError;
    }
  };

  function passwordCheck() {
    password === confirmPassword
      ? signUpTest()
      : Alert.alert("Your passwords don't match");
    // setPassword("");
    // setconfirmPassword("");
  }

  // RENDER THE FOLLOWING:
  return (
    <View style={styles.formBox}>
      <Text style={styles.title}>Redy</Text>
      <CustomInput
        inputField={"Email"}
        value={email}
        setValue={setEmail}
        secureTextEntry={false}
      />
      <CustomInput
        inputField={"First Name"}
        value={firstName}
        setValue={setfirstName}
        secureTextEntry={false}
      />
      <CustomInput
        inputField={"Last Name"}
        value={lastName}
        setValue={setlastName}
        secureTextEntry={false}
      />
      <CustomInput
        inputField={"Phone Number"}
        value={phoneNumber}
        setValue={setphoneNumber}
        secureTextEntry={false}
      />
      <CustomInput
        inputField={"Password"}
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <CustomInput
        inputField={"Confirm Password"}
        value={confirmPassword}
        setValue={setconfirmPassword}
        secureTextEntry={true}
      />

      <CustomButton text="Create Business Account" onPress={passwordCheck} />
      <Text style={styles.termsOfUse}>
        By registering, you confirm that you accept our Terms of Use and Privacy
        Policy
      </Text>
    </View>
  );
};
// STYLES
const styles = StyleSheet.create({
  formBox: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignItems: "center",
    maxWidth: 300,
  },
  title: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: "bold",
  },
});
export default SignUpBusinessUser;
