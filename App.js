import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from './app/Screens/Home';
import Maps from './app/Screens/Maps';
import SignInScreen from './app/Screens/SignInScreen';
import SignUpScreen from './app/Screens/SignUpScreen';
import SignUpUser from './app/Screens/SignUpUser';
import SignUpBusiness from './app/Screens/SignUpBusiness';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Home" component={Home} /> */}
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Choose Account" component={SignUpScreen} />
        <Stack.Screen name="Sign Up User" component={SignUpUser} />
        <Stack.Screen name="Sign Up Business" component={SignUpBusiness} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const globalScreenOptions = {
//   headerStyle: { backgroundColor: colors.secondaryColor },
//   headerTitleStyle: { color: colors.white },
//   headerTintColor: colors.white,
// };
