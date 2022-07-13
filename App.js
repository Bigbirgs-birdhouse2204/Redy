import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./app/Screens/Home";
import Maps from "./app/Screens/Maps";
import SignInScreen from "./app/Screens/SignInScreen";
import SignUpScreen from "./app/Screens/SignUpScreen";
import SingleRestaurant from "./app/Screens/SingleRestaurant";
import SignUpUser from "./app/Screens/SignUpUser";
import { Provider } from "react-redux";
import store from "./app/store";
import Routes from "./app/Screens/Routes";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
