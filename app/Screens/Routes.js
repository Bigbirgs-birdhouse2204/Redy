import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './Home';
import Maps from './Maps';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import SingleRestaurant from './SingleRestaurant';
import SignUpUser from './SignUpUser';
import SignUpBusinessUser from './SignUpBusinessUser';
import ManageBusiness from './ManageBusiness';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={SignInScreen} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Manage Business" component={ManageBusiness} />
        <Stack.Screen name="Maps" component={Maps} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} />
        <Stack.Screen name="Sign Up User" component={SignUpUser} />
        <Stack.Screen
          name="Sign Up Business User"
          component={SignUpBusinessUser}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Single Restaurant" component={SingleRestaurant} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// function AppStack () {
//   return (
//     <NavigationContainer>
//       <Stack.Screen name="Home" component={Home} />
//       <Stack.Screen name="Single Restaurant" component={SingleRestaurant} />
//     </NavigationContainer>
//   )
// }

// function LoginStack () {
//   <NavigationContainer>
//     <Stack.Screen name="Sign In" component={SignInScreen} />
//     <Stack.Screen name="Sign Up" component={SignUpScreen} />
//   </NavigationContainer>
// }

// const globalScreenOptions = {
//   headerStyle: { backgroundColor: colors.secondaryColor },
//   headerTitleStyle: { color: colors.white },
//   headerTintColor: colors.white,
// };
