import { StyleSheet, View, ScrollView } from "react-native";
import Dialog from "react-native-dialog";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../CustomComponents/CustomButton";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import {
  Provider as PaperProvider,
  Text,
  Card,
  Avatar,
  Button,
  Title,
  Paragraph,
} from "react-native-paper";

const SingleRestaurant = (props) => {
  const [tables, setTables] = useState([]);
  const [tableSelected, setTableSelected] = useState([]);
  const navigation = useNavigation();

  const {selectedRestaurant} = useSelector((state) => {
    return state;
  });


  const getTables = async (restaurantId) => {
    const { data } = await axios.get(
      `https://redy-capstone.herokuapp.com/api/table/restaurant/${restaurantId}`
    );
    setTables(data);
  };

  console.log(selectedRestaurant)
  console.log("THIS IS PROPS OF SELECTED RES", props.route.params.selectedRestaurant)
  useEffect(() => {
    getTables(props.route.params.selectedRestaurant);
  }, []);

  const tablePicked = async (tableId) => {
    setTableSelected(tableId);

    navigation.navigate("Confirm Reservation", {
      tableSelected,
    });
  };

  const backPressed = () => {
    setTables([]);
    navigation.navigate("Maps");
  };

  return (
    <PaperProvider>
      <ScrollView>
        <CustomButton text="Back" onPress={backPressed} />
        {tables.map((table) => (
          <Card key={table.id}>
            <Card.Title
              title={props.route.params.dialogInfo.title}
              subtitle="Today - 8:00 PM"
            />
            <Card.Content>
              {/* <Title>Table for "INSERT NUMBER HERE"</Title> */}
              <Paragraph>Maximum Party Size: {table.seats} </Paragraph>
              <Paragraph>
                Address: {props.route.params.dialogInfo.vicinity}
              </Paragraph>
            </Card.Content>
            <Card.Cover
              source={{
                uri: "https://media.cool-cities.com/macao002pr_f_mob.jpg?h=730",
              }}
            />
            <Card.Actions>
              {/* <Button>Cancel</Button> */}
              <Button onPress={() => tablePicked(table.id)}>
                Confirm Reservation
              </Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </PaperProvider>
  );
};

export default SingleRestaurant;

const styles = StyleSheet.create({});
