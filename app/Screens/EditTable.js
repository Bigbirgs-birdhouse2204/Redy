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

const EditTable = (props) => {
  const [updateTable, setUpdateTable] = useState([]);
  const [seat, setSeat] = useState();

  let tableSelected = props.route.params.tableSelected;
  {
    console.log('YO THIS IS PROPS', props.route.params.tableSelected);
    console.log('SEATS IS THIS MUCH', seat);
  }

  useEffect(() => {
    getTableSelected(tableSelected);
  }, []);

  const getTableSelected = async (tableId) => {
    const { data } = await axios.get(
      `https://redy-capstone.herokuapp.com/api/table/${tableId}`
    );
    setUpdateTable(data);

    // console.log('WE EDITING THIS TABLE', Settings);
  };

  // const updateTableSettings = async () => {
  //   const { data } = await axios.get(
  //     `https://redy-capstone.herokuapp.com/api/table/${tableId}`
  //   );
  //   setUpdateTable(data);

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
              Is this table occupied?: {`${updateTable.isOccupied}`}
            </Paragraph> */}
            <TextInput
              onChangeText={(text) => setSeat(text)}
              value={`${updateTable.seats}`}
            />
            <TextInput
              value={`${updateTable.isOccupied}`}
              onChangeText={setSeat}
            />
          </Card.Content>

          <Card.Actions>
            {/* <Button onPress={() => updateTableSettings()}>Update Table</Button> */}
          </Card.Actions>
        </Card>
      </ScrollView>
    </PaperProvider>
  );
};

export default EditTable;

const styles = StyleSheet.create({});
