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

const Stack = createNativeStackNavigator();
// const AuthStack = createStackNavigator({
//   SignIn: SignIn,
// });
// const SettingsStack = createStackNavigator({
//   Settings: Settings,
// });
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={SignUpUser} />
        {/* <Stack.Screen name="Sign In" component={Maps} /> */}
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Single Restaurant" component={SingleRestaurant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const globalScreenOptions = {
//   headerStyle: { backgroundColor: colors.secondaryColor },
//   headerTitleStyle: { color: colors.white },
//   headerTintColor: colors.white,
// };
