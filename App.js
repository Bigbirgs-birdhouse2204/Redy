import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./app/Screens/Home";
import Maps from "./app/Screens/Maps";
import SignInScreen from "./app/Screens/SignInScreen";
import SignUpScreen from "./app/Screens/SignUpScreen";


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
      {/* <Stack.Screen name="Home" component={Home} /> */}
      <Stack.Screen name="Sign In" component={SignInScreen} />
      <Stack.Screen name="Sign Up" component={SignUpScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

  // const globalScreenOptions = {
  //   headerStyle: { backgroundColor: colors.secondaryColor },
  //   headerTitleStyle: { color: colors.white },
  //   headerTintColor: colors.white,
  // };
