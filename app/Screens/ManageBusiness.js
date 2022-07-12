import { StyleSheet, Text, View } from 'react-native';
import React, {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { logout } from '../store';
import CustomButton from '../CustomComponents/CustomButton';

const ManageBusiness = ({ navigation }) => {

  const { auth } = useSelector((state) => {
    return state;
  });
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

  useEffect(() =>{

  }, [])

  return (
    <View>
      <Text>ManageBusiness</Text>

      <CustomButton text="Add Restaurant" onPress={logOutTest} />


      <CustomButton text="Sign Out" onPress={logOutTest} />
    </View>
  );
};

export default ManageBusiness;

const styles = StyleSheet.create({});
