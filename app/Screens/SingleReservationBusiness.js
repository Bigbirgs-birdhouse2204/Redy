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
  let restaurant = props.route.params

  useEffect(() => {
    getTableSelected(restaurantId);
  }, []);

  const getTableSelected = async (rId) => {
    const { data } = await axios.get(
      `https://redy-capstone.herokuapp.com/api/reservation/business/${rId}`
    );
    setReservation(data);

  };


  return (
    <PaperProvider>
      <ScrollView>
        <Card>
          <Card.Title subtitle={`Reservations for ${restaurant.name}`} />
            {reservation.map( (reservation, index) =>
              <Card.Content key={index}>
            <Title>Table for {`${reservation.user.firstName} ${reservation.user.lastName}`}</Title>
                        <Paragraph>
              Table#: {reservation.diningTables[0].id} </Paragraph>

            <Paragraph>
              Party Size: {reservation.partySize} </Paragraph>
            <Paragraph>
              Booking Status: {`${reservation.status}`}
            </Paragraph>
            <Paragraph>
              Created at: {`${reservation.diningTables[0].reservedSeating.createdAt}`}
            </Paragraph>
          </Card.Content>
            )

          }

          <Card.Actions>
          </Card.Actions>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
};

export default SingleReservationBusiness;

const styles = StyleSheet.create({});
