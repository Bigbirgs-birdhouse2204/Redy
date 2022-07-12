import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getOwnerRestaurants, logout } from '../store';
import CustomButton from '../CustomComponents/CustomButton';

const ManageBusiness = ({ navigation }) => {
  const { owner: restaurant } = useSelector((state) => {
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
  const onAddRestaurantPressed = () => {
    navigation.navigate('Add Restaurant');
  };

  useEffect(() => {
    dispatch(getOwnerRestaurants())
  }, []);

  return (
    <View>
      <Text>Manage Businesses</Text>
      <CustomButton text="Add a Restaurant!" onPress={onAddRestaurantPressed} />
      {
        !restaurant.length ? <Text>You don't have Restaurants to manage. Please add a Restaurant </Text> : restaurant.map(
          (restaurant, i) => <CustomButton key={i} text={`${restaurant.name} - Edit`} onPress={logOutTest} />
        )
      }


      <CustomButton text="Sign Out" onPress={logOutTest} />
    </View>
  );
};

export default ManageBusiness;

const styles = StyleSheet.create({});
