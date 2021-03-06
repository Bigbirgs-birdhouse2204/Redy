import 'react-native-gesture-handler';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import Home from './Home';
import Maps from './Maps';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import SingleRestaurant from './SingleRestaurant';
import SignUpUser from './SignUpUser';
import SignUpBusinessUser from './SignUpBusinessUser';
import ManageBusiness from './ManageBusiness';
import AddRestaurant from './AddRestaurant';
import EditRestaurant from './EditRestaurant';
import EditTable from './EditTable';
import BusinessReservations from './BusinessReservations';
import SingleReservationBusiness from './SingleReservationBusiness';
import BookingConfirmed from './BookingConfirmed';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const { auth } = useSelector((state) => {
    return state;
  });
  return !auth.id ? (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home Screen') {
              iconName = focused ? 'home' : 'home-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Home Screen"
          component={UserNavigator}
          options={{
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  ) : !auth.isOwner && auth.id ? (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home Screen') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Map View') {
              iconName = focused ? 'map' : 'map-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Home Screen"
          component={UserNavigator}
          options={{
            headerShown: false,
          }}
        />

        <Tab.Screen
          name="Map View"
          component={MapNavigator}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  ) : (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home Screen') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Map View') {
              iconName = focused ? 'map' : 'map-outline';
            } else if (route.name === 'Manage Restaurants') {
              iconName = focused ? 'pencil' : 'pencil-outline';
            } else if (route.name === 'View Reservations') {
              iconName = focused ? 'eye' : 'eye-outline';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen
          name="Home Screen"
          component={UserNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Manage Restaurants"
          component={OwnerNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="View Reservations"
          component={ReservationNavigator}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Map View"
          component={Maps}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const UserNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Sign In"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
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
      <Stack.Screen
        name="Manage Business"
        component={ManageBusiness}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="See Reservations"
        component={BusinessReservations}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Single Reservation Business"
        component={SingleReservationBusiness}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign Up User"
        component={SignUpUser}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign Up Business User"
        component={SignUpBusinessUser}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const OwnerNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Sign In">
      <Stack.Screen
        name="Manage Business"
        component={ManageBusiness}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Restaurant"
        component={EditRestaurant}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Table"
        component={EditTable}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MapNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Maps">
      <Stack.Screen
        name="Maps"
        component={Maps}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const ReservationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Sign In">
      <Stack.Screen
        name="See Reservations"
        component={BusinessReservations}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Single Reservation Business"
        component={SingleReservationBusiness}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Edit Table"
        component={EditTable}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
