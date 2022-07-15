import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Provider as PaperProvider,
  Text,
  Card,
  Avatar,
  Button,
  Title,
  Paragraph,
} from "react-native-paper";
import CustomButton from "../CustomComponents/CustomButton";
import { useNavigation } from "@react-navigation/native";

import text from "../CustomComponents/Text";

const BookingConfirmed = (props) => {
  const navigation = useNavigation();
  const selectedRestaurant = props.route.params.selectedRestaurant;
  const table = props.route.params.table;

  const user = useSelector((state) => {
    return state.auth;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titlecard}>
        <Text style={styles.title}>{selectedRestaurant.name}</Text>
        <Card>
          <Card.Content>
            <Paragraph style={{ fontFamily: text.primaryFont }}>
              Maximum Party Size: {table.seats}{" "}
            </Paragraph>
            <Paragraph style={{ fontFamily: text.primaryFont }}>
              Address: {selectedRestaurant.address}
            </Paragraph>
          </Card.Content>
          <Card.Cover
            source={{
              uri: "https://media.cool-cities.com/macao002pr_f_mob.jpg?h=730",
            }}
          />
          <Card.Actions>{/* <Button>Cancel</Button> */}</Card.Actions>
          <Paragraph style={styles.thankyoutext}>
            Thanks for booking {user.firstName}! Please show up within 5 minutes
            to secure your seating.
          </Paragraph>
        </Card>
      </View>
    </SafeAreaView>
  );
};

export default BookingConfirmed;

const styles = StyleSheet.create({
  photo: {
    width: 500,
    height: 250,
    // position:'absolute',
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontFamily: text.primaryFont,
    bottom: 50,
  },
  confirmationlogo: {
    height: 500,
  },
  thankyoutext: {
    fontFamily: text.primaryFont,
    textAlign: "center",
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    justifyContent: "space-evenly",
  },
  titlecard: {},
});
