import { View, Text, Image, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import CustomInput from '../CustomComponents/CustomInput';
import CustomButton from '../CustomComponents/CustomButton';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from "axios";

const SignUpUser = () => {
  // Local State:
  const [email, setEmail] = useState('');
  const [firstName, setfirstName] = useState('');
  const [lastName, setlastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  // UseNavigation Hook:
  const navigation = useNavigation();

  // useEffect Hook:
  useEffect(() => {
    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   if (user) {
    //     console.log(user)
    //     console.warn('Already Signed In')
    //     navigation.replace('Task Screen')
    //   }
    // })
    // return unsubscribe;
  }, []);

  // Functions within SignInScreen:
  const handleLogin = () => {
    // auth.signInWithEmailAndPassword(email, password)
    // .then(userCredentials => {
    //   const user = userCredentials.user;
    //   console.log(`Logged in with:`, user.email)
    //   navigation.replace('Task Screen')
    // })
    // .catch(error => {alert(error.message)})
  };
  const storeToken = async (value) => {
    try {
      await AsyncStorage.setItem('token', value)
    } catch (e) {
      // saving error
    }
  }
const signUpTest = async () => {
    try {

      let formData = {
          firstName: 'expo',
          lastName: 'project',
          email: 'expo@gmail.com',
          password: '123',
          phone: '555-555-5555',
          isAdmin: false,
      }
      const res = await axios.post(`https://redy-capstone.herokuapp.com/auth/signup`, formData);

     storeToken(res.data.token)

    //  console.log( await AsyncStorage.getItem('token'))

      // window.localStorage.setItem(TOKEN, res.data.token);
      //localStorage.getItem('token');
      // localStorage.getItem('token');
      // dispatch(me());
      console.log(`test: `,res.data)
      return res.data
    } catch (authError) {
      console.log(authError)
      return authError
      // return dispatch(setAuth({ error: authError }));
    }
  };

  const onForgotPasswordPressed = () => {
    console.warn('Forgot Password');
  };

  const onCreateAccountPressed = () => {
    console.warn('Create Account');
    navigation.navigate('Sign Up');
  };

  const backPressed = () => {
    console.warn('Choose Account');
    navigation.navigate('Choose Account');
  };

  // RENDER THE FOLLOWING:
  return (
    <View style={styles.logotitle}>
      <Text style={styles.title}>Redy</Text>
      <CustomInput
        inputField={'Email'}
        value={email}
        // onChangeText = {text => setEmail(text)}
        setValue={setEmail}
        secureTextEntry={false}
      />
      <CustomInput
        inputField={'First Name'}
        value={firstName}
        // onChangeText = {text => setEmail(text)}
        setValue={setfirstName}
        secureTextEntry={false}
      />
      <CustomInput
        inputField={'Last Name'}
        value={lastName}
        // onChangeText = {text => setEmail(text)}
        setValue={setlastName}
        secureTextEntry={false}
      />
      <CustomInput
        inputField={'Password'}
        value={password}
        // onChangeText = {text => setPassword(text)}
        setValue={setPassword}
        secureTextEntry={true}
      />
      <CustomInput
        inputField={'Confirm Password'}
        value={confirmPassword}
        // onChangeText = {text => setconfirmPassword(text)}
        setValue={setconfirmPassword}
        secureTextEntry={true}
      />

      <CustomButton text="Create User Account" onPress={signUpTest} />
      <Text style={styles.termsOfUse}>
        By registering, you confirm that you accept our Terms of Use and Privacy
        Policy
      </Text>
      <CustomButton text="Back" onPress={backPressed} />
    </View>
  );
};
// STYLES
const styles = StyleSheet.create({
  logotitle: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 150,
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    alignItems: 'center',
    maxWidth: 300,
  },
  title: {
    marginTop: 30,
    fontSize: 30,
    fontWeight: 'bold',
  },
});
export default SignUpUser;
