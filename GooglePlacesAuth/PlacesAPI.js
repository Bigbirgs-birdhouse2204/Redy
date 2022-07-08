import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const PlacesAPI = () => {
  return (
    <GooglePlacesAutocomplete
      style={styles.container}
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
      }}
      query={{
        key: "AIzaSyBiL6FWWWLLP1E-9oT6ySdw-BhDwP0nn0M",
        language: "en",
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    backgroundColor: "#000000",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlacesAPI;
