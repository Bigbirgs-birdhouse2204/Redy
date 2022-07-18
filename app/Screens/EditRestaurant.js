import { StyleSheet, View, ScrollView, TextInput } from 'react-native';
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
import CustomInput from '../CustomComponents/CustomInput';

const EditRestaurant = (props) => {
  const [tables, setTables] = useState([]);
  const [seats, setSeats] = useState({});
  const [tableSelected, setTableSelected] = useState([]);
  const navigation = useNavigation();

  const { params: restaurant } = props.route;
  const getTables = async (restaurantId) => {
    const { data } = await axios.get(
      `https://redy-capstone.herokuapp.com/api/table/all/restaurant/${restaurantId}`
      );
      setTables(data);
      // const seatsObj = data.map(d => {return  { [d.id] : {seats: d.seats, isOccupied: d.isOccupied} }} )

      setSeats
  };

  const tablePicked = async (tableId) => {
    await setTableSelected(tableId);
    navigation.navigate('Edit Table', {
      tableSelected,
    });
  };

  const backPressed = () => {
    setTables([]);
    navigation.navigate('Maps');
  };

  useEffect(() => {
    getTables(restaurant.id);
  }, []);
  return (
    <PaperProvider>
      <ScrollView>
        <CustomButton text="Back" onPress={backPressed} />
        {tables.map((table) => (
          <Card key={table.id}>
            <Card.Title title={restaurant.name} subtitle="Today - 8:00 PM" />
            <Card.Content>
              {/* <Title>Table for "INSERT NUMBER HERE"</Title> */}
              <Paragraph>Maximum Party Size: <TextInput
              onChangeText={(text) => setTables( prevState => {
                let newArr = [...prevState ]
                newArr[newArr.findIndex(el => el.id == table.id)].seats = text
                return newArr
              })}
              value={table.seats}
            />
            </Paragraph>
              <Paragraph>Is this Occupied?: <TextInput
              onChangeText={(text) => setTables(text)}
              value={`${table.seats}`}
            /> {`${table.isOccupied}`}</Paragraph>
            </Card.Content>

            <Card.Actions>
              <Button onPress={() => tablePicked(table.id)}>
                Confirm Change
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
