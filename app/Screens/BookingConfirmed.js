import { StyleSheet, View, Image, ScrollView} from 'react-native'
import { useState, useEffect } from 'react'
import React from 'react'
import { Button, Text } from 'react-native-paper'

const BookingConfirmed = (props) => {

  const selectedRestaurant = props.route.params.selectedRestaurant;
  const table = props.route.params.table;
  const current = new Date();
  const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;


  useEffect(() => {
  console.log('this is props', props)

  })
  return (
      <ScrollView>
      <Image
        source={{
          uri: 'https://media.cool-cities.com/macao002pr_f_mob.jpg?h=730'
        }}
        style={styles.photo}/>
        <Image
          source={{
            uri: 'https://t3.ftcdn.net/jpg/03/38/92/74/360_F_338927425_ORe15ecNoxoWiV78YSdAQXXoHZzsNY4c.jpg'
        }}
        styles = {styles.confirmationlogo}/>
        <Text style={styles.title}>{selectedRestaurant.name}</Text>
        <Text >{date}</Text>
        </ScrollView>
  )
}

export default BookingConfirmed

const styles = StyleSheet.create({
  photo: {
    width: 500,
    height: 250,
    // position:'absolute',
  },
  title: {
    fontSize: 20,
    margin: 20,
  },
  confirmationlogo: {
    height: 500
  }
})
