import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { logout } from '../store';
import CustomButton from '../CustomComponents/CustomButton';

const Home = ({ navigation }) => {
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
  const onManageBusiness = () => {
    navigation.navigate('Manage Business');
  };

  const onManageReservations = () => {
    navigation.navigate('See Reservations');
  };

  return (
    <View>
      <Text>Home</Text>
      <CustomButton text="Book Now!" onPress={onBookNowPressed} />
      {
        !auth.isOwner ? null :
<View>

          <CustomButton text="Manage Businesses" onPress={onManageBusiness} />
          <CustomButton text="See Reservations" onPress={onManageReservations} />
</View>


      }
      <CustomButton text="Sign Out" onPress={logOutTest} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
