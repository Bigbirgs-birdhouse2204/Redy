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
import { Provider } from 'react-redux';
import store from './app/store';
import { createStackNavigator } from 'react-navigation-stack';
import SignIn from './app/Screens/SignInScreen';
import Settings from './app/Screens/settings';

const Stack = createNativeStackNavigator();
// const AuthStack = createStackNavigator({
//   SignIn: SignIn,
// });
// const SettingsStack = createStackNavigator({
//   Settings: Settings,
// });
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Sign In" component={SignInScreen} />
          <Stack.Screen name="Choose Account" component={SignUpScreen} />
          <Stack.Screen name="Sign Up User" component={SignUpUser} />
          <Stack.Screen name="Sign Up Business" component={SignUpBusiness} />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// const globalScreenOptions = {
//   headerStyle: { backgroundColor: colors.secondaryColor },
//   headerTitleStyle: { color: colors.white },
//   headerTintColor: colors.white,
// };
