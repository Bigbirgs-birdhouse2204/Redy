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

const EditRestaurant = (props) => {
  const [tables, setTables] = useState([]);
  const [tableSelected, setTableSelected] = useState([]);
  const navigation = useNavigation();
  const {params: restaurant} = props.route
console.log(`This is the props: `,restaurant)
  useEffect(() => {
    getTables(restaurant.id);
  }, []);

  const getTables = async (restaurantId) => {
    const { data } = await axios.get(
      `https://redy-capstone.herokuapp.com/api/table/all/restaurant/${restaurantId}`
    );
    setTables(data);
    console.log('THIS IS TABLE', data);
  };

  const tablePicked = async (tableId) => {
    setTableSelected(tableId);
    console.log('THIS IS THE TABLE PICKED', tableSelected);
    navigation.navigate('Confirm Reservation', {
      tableSelected,
    });
  };

  const backPressed = () => {
    setTables([]);
    navigation.navigate('Maps');
  };

  return (
    <PaperProvider>
      <ScrollView>
        <CustomButton text="Back" onPress={backPressed} />
        {tables.map((table) => (
          <Card key={table.id}>
            <Card.Title
              title={restaurant.id}
              subtitle="Today - 8:00 PM"
            />
            <Card.Content>
              {/* <Title>Table for "INSERT NUMBER HERE"</Title> */}
              <Paragraph>Maximum Party Size: {table.seats} </Paragraph>
              <Paragraph>
                Address: {restaurant.id}
              </Paragraph>
            </Card.Content>
            <Card.Cover
              source={{
                uri: 'https://media.cool-cities.com/macao002pr_f_mob.jpg?h=730',
              }}
            />
            <Card.Actions>
              {/* <Button>Cancel</Button> */}
              <Button onPress={() => tablePicked(table.id)}>
                Edit Table
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </PaperProvider>
  );
};

export default EditRestaurant;

const styles = StyleSheet.create({});
