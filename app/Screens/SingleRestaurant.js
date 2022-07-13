import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
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

import { fetchAllTables } from "../store/tables";
import { editTable } from "../store/tables";
import { createReservation } from "../store/reservation";

const SingleRestaurant = (props) => {
  const selectedRestaurant = props.route.params.selectedRestaurant[0];
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const tables = useSelector((state) => {
    return state.tables;
  });

  const user = useSelector((state) => {
    return state.auth;
  });

  const handleReservation = (table) => {
    dispatch(editTable(selectedRestaurant.id, table.id));
    dispatch(
      createReservation({
        status: "Booked",
        partySize: table.seats,
        restaurantId: selectedRestaurant.id,
        userId: user.id,
      })
    );
    navigation.navigate("Booking Confirmed", { selectedRestaurant, table });
  };

  useEffect(() => {
    dispatch(fetchAllTables(selectedRestaurant.id));
  }, []);

  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          {/* <CustomButton text="Back" onPress={backPressed} /> */}
        <Text style={styles.title}>{selectedRestaurant.name}</Text>
          {/* <Card.Title
            title={selectedRestaurant.name}
            titleVariant='titleLarge'
            style={{ alignContent: "center" }}
          /> */}
          {tables.map((table) => (
            <Card key={table.id} style = {{top: 15}}>
              <Card.Content>
                <Paragraph>Maximum Party Size: {table.seats} </Paragraph>
                <Paragraph>Address: {selectedRestaurant.address}</Paragraph>
              </Card.Content>
              <Card.Cover
                source={{
                  uri: "https://media.cool-cities.com/macao002pr_f_mob.jpg?h=730",
                }}
              />
              <Card.Actions>
                {/* <Button>Cancel</Button> */}
                <Button onPress={() => handleReservation(table)}>
                  Confirm Reservation
                </Button>
              </Card.Actions>
            </Card>
          ))}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default SingleRestaurant;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: 'center',
    fontFamily: 'Times New Roman',
  }
});
