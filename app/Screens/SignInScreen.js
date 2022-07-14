import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomInput from '../CustomComponents/CustomInput';
import CustomButton from '../CustomComponents/CustomButton';
import { authenticate } from '../store';

const SignInScreen = ({ navigation }) => {
  // Local State:
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    return () => navigation.getParent().setOptions({ tabBarStyle: undefined });
  }, []);
  //   navigation.getParent().setOptions({ tabBarStyle: { display: 'none' } });
  //   return () => navigation.getParent().setOptions({ tabBarStyle: undefined });
  // }, [navigation]);

  const onCreateAccountPressed = () => {
    navigation.navigate('Sign Up');
  };

  const onForgotPasswordPressed = () => {
    console.warn('Forgot Password');
  };

  const loginTest = async () => {
    try {
      dispatch(
        authenticate(
          { email: email.trim(), password },
          'login',
          navigation,
          'Home'
        )
      );
    } catch (authError) {
      console.log(authError);
      return authError;
    }
  };

  // RENDER THE FOLLOWING:
  return (
    <SafeAreaView style={styles.logotitle}>
      <Image style={styles.logo} source={require('../assets/Redy.png')} />
      <Text style={styles.title}>Redy</Text>
      <CustomInput
        inputField={'Email'}
        value={email}
        // onChangeText = {text => setEmail(text)}
        setValue={setEmail}
        secureTextEntry={false}
      />
      <CustomInput
        inputField={'Password'}
        value={password}
        // onChangeText = {text => setPassword(text)}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <CustomButton text="Sign In" onPress={loginTest} />
      <CustomButton
        text="Forgot Password?"
        onPress={onForgotPasswordPressed}
        type="TERTIARY"
      />
      <CustomButton
        text="Dont have an Account? Click Here"
        onPress={onCreateAccountPressed}
      >
        Dont have an account? Create one!
      </CustomButton>
    </SafeAreaView>
  );
};
// STYLES
const styles = StyleSheet.create({
  logotitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 150,
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
  stretch: {
    width: 200,
    height: 200,
    resizeMode: 'stretch',
  },
});

SignInScreen.navigationOptions = {
  title: 'Sign In',
};

export default SignInScreen;
