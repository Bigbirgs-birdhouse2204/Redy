import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { logout } from '../store';
import CustomButton from '../CustomComponents/CustomButton';

const ManageBusiness = ({ navigation }) => {
  const dispatch = useDispatch();

  const logOutTest = async () => {
    try {
      dispatch(logout(navigation));
    } catch (err) {
      console.log(err);
    }
  };

  const onBookNowPressed = () => {
    navigation.navigate('Maps');
  };

  return (
    <View>
      <Text>ManageBusiness</Text>

      <CustomButton text="Sign Out" onPress={logOutTest} />
    </View>
  );
};

export default ManageBusiness;

const styles = StyleSheet.create({});
