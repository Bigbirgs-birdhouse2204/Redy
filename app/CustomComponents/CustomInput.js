import { View, Text, TextInput, StyleSheet} from 'react-native'
import React from 'react'

const CustomInput = ({value, setValue, inputField, secureTextEntry}) => {
  return (
    <View style = {styles.container}>
      <TextInput
        value = {value}
        onChangeText = {setValue}
        style = {styles.input}
        placeholder={inputField}
        placeholderTextColor="#A9A9A9"
        secureTextEntry = {secureTextEntry}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: "100%",
    borderColor: '#E8E8E8',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    marginVertical: 10,
    justifyContent: 'center',
  },
  input: {
    textAlign: 'center',
    alignItems: "center",
  }
})

export default CustomInput
