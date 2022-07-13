import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";

const CustomButton = ({ text, onPress, type = "PRIMARY" }) => {
  return (
    <Pressable
      style={[styles.container, styles[`container_${type}`]]}
      onPress={onPress}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },

  container_PRIMARY: {
    backgroundColor: "#3B71F3",
  },
  container_SECONDARY: {
    backgroundColor: "#3B71F3",
    width: "30%",
  },
  container_TERTIARY: {},
  container_Load_Default_Tasks: {
    backgroundColor: "#3B71F3",
    width: "44%",
    marginTop: 10,
    padding: 10,
    textAlign: "center",
  },

  text: {
    fontWeight: "bold",
    color: "white",
  },
  text_TERTIARY: {
    fontWeight: "bold",
    color: "gray",
  },
});
export default CustomButton;
