import { StyleSheet, View, ScrollView } from 'react-native';
import Dialog from 'react-native-dialog';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../CustomComponents/CustomButton';
import axios from 'axios';
import {
  Provider as PaperProvider,
  Text,
  Card,
  Avatar,
  Button,
  Title,
  Paragraph,
} from 'react-native-paper';

const ConfirmReservation = (props) => {
  const navigation = useNavigation();

  console.log('CONFIRM RES PROPS,', props);

  const [reservation, setReservation] = useState([]);

  // const navigation = useNavigation();

  useEffect(() => {
    getTableSelected(props.route.params.tableSelected);
  }, []);

  const getTableSelected = async (tableId) => {
    const { data } = await axios.get(
      `https://redy-capstone.herokuapp.com/api/table/${tableId}`
    );
    setReservation(data);
    console.log('THIS IS TABLE WE GONNA RESERVE', data);
  };

  const makeReservation = async () => {
    try {
      const { data } = await axios.post(
        `https://redy-capstone.herokuapp.com/api/reservation`,
        {
          status: 'Booked',
          partySize: 4,
          
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  const backPressed = () => {
    navigation.navigate('Single Restaurant');
  };
  return (
    <PaperProvider>
      <ScrollView>
        <CustomButton text="Back" onPress={backPressed} />
        <Card>
          <Card.Title subtitle="Today - 8:00 PM" />
          <Card.Content>
            {/* <Title>Table for "INSERT NUMBER HERE"</Title> */}
            <Paragraph>Maximum Party Size </Paragraph>
            <Paragraph>Address:</Paragraph>
          </Card.Content>
          <Card.Cover
            source={{
              uri: 'https://media.cool-cities.com/macao002pr_f_mob.jpg?h=730',
            }}
          />
          <Card.Actions>
            {/* <Button>Cancel</Button> */}
            <Button onPress={() => makeReservation()}>
              Confirm Reservation
            </Button>
          </Card.Actions>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
};

export default ConfirmReservation;

const styles = StyleSheet.create({});