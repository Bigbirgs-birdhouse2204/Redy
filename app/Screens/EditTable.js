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


  useEffect(() => {
    getTableSelected(tableSelected);
  }, []);

  const getTableSelected = async (tableId) => {
    const { data } = await axios.get(
      `https://redy-capstone.herokuapp.com/api/table/${tableId}`
    );
    setUpdateTable(data);
  };

  return (
    <PaperProvider>
      <ScrollView>
        <Card>
          <Card.Title subtitle="Please edit this table." />
          <Card.Content>
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
