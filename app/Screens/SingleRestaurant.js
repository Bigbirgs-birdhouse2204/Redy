import { StyleSheet, View, ScrollView, SafeAreaView } from "react-native";
// import Dialog from "react-native-dialog";
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
  Dialog,
  Portal,
  TextInput,
  Snackbar,
} from "react-native-paper";

import { fetchAllTables } from "../store/tables";
import { editTable } from "../store/tables";
import { createReservation, joinWaitList } from "../store/reservation";

const SingleRestaurant = (props) => {
  const selectedRestaurant = props.route.params.selectedRestaurant[0];
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [snackBarVisible, setSnackBarVisible] = useState(false);
  const [partySize, setPartySize] = useState("0");
  const onToggleSnackBar = () => setSnackBarVisible(!snackBarVisible);
  const onDismissSnackBar = () => setSnackBarVisible(false);
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
        diningTableId: table.id,
      })
    );
    navigation.navigate("Booking Confirmed", { selectedRestaurant, table });
  };

  const onCheckLimit = (value) => {
    const parsedQty = parseInt(value);
    if (Number.isNaN(parsedQty)) {
      setPartySize(0); //setter for state
    } else if (parsedQty > 12) {
      setPartySize(12);
    } else {
      setPartySize(parsedQty);
    }
    handleWaitList();
  };

  const handleWaitList = () => {
    dispatch(
      joinWaitList({
        status: "WaitList",
        partySize: partySize,
        restaurantId: selectedRestaurant.id,
        userId: user.id,
      })
    );
    onToggleSnackBar()
    navigation.navigate("Maps", {snackbar: onToggleSnackBar(), timer});
  };
  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
   const timer = setTimeout(() => {
    onDismissSnackBar();
  }, 10000);


  useEffect(() => {
    dispatch(fetchAllTables(selectedRestaurant.id));
    if(snackBarVisible){
      timer();
    }
      }, [setSnackBarVisible]);
  return (
    <PaperProvider>
      <SafeAreaView>
        <ScrollView>
          <Text style={styles.title}>{selectedRestaurant.name}</Text>

          {!tables.length ? (
            <>
              <Text>
                There are no Tables Available at time. Be notified when a table
                open up!
              </Text>
              <Button onPress={showDialog}>
                Join {selectedRestaurant.name} WaitList
              </Button>
              <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                  <Dialog.Title>How many is in your party? </Dialog.Title>
                  <Dialog.Content>
                    <TextInput
                      style={styles.input}
                      onChangeText={setPartySize}
                      value={partySize}
                      placeholder="Enter your party size here"
                      keyboardType="numeric"
                    />

                    <Dialog.Actions>
                      <Button onPress={onCheckLimit}>Confirm</Button>
                    </Dialog.Actions>
                  </Dialog.Content>
                </Dialog>
                <Snackbar
                      visible={snackBarVisible}
                      onDismiss={onDismissSnackBar}
                      action={{
                        label: "Undo",
                        onPress: () => {
                          // Do something

                        },
                      }}
                    >
                      Hey there! I'm a Snackbar.
                    </Snackbar>
              </Portal>
            </>
          ) : (
            tables.map((table) => (
              <Card key={table.id} style={{ top: 15 }}>
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
            ))
          )}
        </ScrollView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default SingleRestaurant;

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: "Times New Roman",
  },
});
