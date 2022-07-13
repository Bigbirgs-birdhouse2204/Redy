import { StyleSheet, View, ScrollView } from 'react-native';
import Dialog from 'react-native-dialog';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../CustomComponents/CustomButton';
import { TextInput } from 'react-native-paper';

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
import CustomInput from '../CustomComponents/CustomInput';

const SingleReservationBusiness = (props) => {
  const [reservation, setReservation] = useState([]);
  const [seat, setSeat] = useState();

  let restaurantId = props.route.params.id;
  {
    console.log('YO THIS IS PROPS', props.route.params.tableSelected);
    console.log('SEATS IS THIS MUCH', seat);
  }

  useEffect(() => {
    getTableSelected(restaurantId);
  }, []);

  const getTableSelected = async (rId) => {
    const { data } = await axios.get(
      `https://redy-capstone.herokuapp.com/api/reservation/business/${rId}`
    );
    setReservation(data);

    // console.log('WE EDITING THIS TABLE', Settings);
  };

  // const reservationSettings = async () => {
  //   const { data } = await axios.get(
  //     `https://redy-capstone.herokuapp.com/api/table/${tableId}`
  //   );
  //   setReservation(data);

  //   // console.log('WE EDITING THIS TABLE', Settings);
  // };

  return (
    <PaperProvider>
      <ScrollView>
        <Card>
          <Card.Title subtitle="Please edit this table." />
          <Card.Content>
            {/* <Title>Table for "INSERT NUMBER HERE"</Title> */}
            {/* <Paragraph>Maximum Party Size: {Settings.seats} </Paragraph>
            <Paragraph>
              Is this table occupied?: {`${reservation.isOccupied}`}
            </Paragraph> */}
            <TextInput
              onChangeText={(text) => setSeat(text)}
              value={`${JSON.stringify(reservation)}`}
            />
            <TextInput
              value={``}
              onChangeText={setSeat}
            />
          </Card.Content>

          <Card.Actions>
            {/* <Button onPress={() => reservationSettings()}>Update Table</Button> */}
          </Card.Actions>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
};

export default SingleReservationBusiness;

const styles = StyleSheet.create({});
