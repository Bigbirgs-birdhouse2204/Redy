import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Home from './Home';
import Maps from './Maps';
import SingleRestaurant from './SingleRestaurant';
import BookingConfirmed from './BookingConfirmed';
import SignInScreen from './SignInScreen';

const Stack = createStackNavigator(); // creates object for Stack Navigator

const UserNavigator = () => {
  return (
    <Stack.Navigator>
      {/* // contains all child component screens within a stack. */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Maps"
        component={Maps}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Single Restaurant"
        component={SingleRestaurant}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Booking Confirmed"
        component={BookingConfirmed}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const LogInScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign In"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export { UserNavigator }; // Stack-Navigator for Screen 1 Tab
/*
const SecondScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen2" component={Screen2} />
      <Stack.Screen name="NestedScreen2" component={NestedScreen} />
    </Stack.Navigator>
  );
};

export { SecondScreenNavigator }; // Stack-Navigator for Screen 2 Tab

const ThirdScreenNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Screen3" component={Screen3} />
      <Stack.Screen name="NestedScreen3" component={NestedScreen} />
    </Stack.Navigator>
  );
};

export { ThirdScreenNavigator }; // Stack-Navigator for Screen 3 Tab
*/
