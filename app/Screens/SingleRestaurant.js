import { StyleSheet, View, ScrollView } from 'react-native'
import React from 'react'
import Dialog from "react-native-dialog";
import {Provider as PaperProvider, Text, Card, Avatar, Button, Title, Paragraph } from 'react-native-paper'

const SingleRestaurant = (props) => {
  // console.warn(props.route.params.dialogInfo.vicinity)
  return (
      <PaperProvider>
        <ScrollView>
       <Card>
    <Card.Title title={props.route.params.dialogInfo.title} subtitle="Today - 8:00 PM" />
    <Card.Content>
      {/* <Title>Table for "INSERT NUMBER HERE"</Title> */}
      <Paragraph>Maximum Party Size: 2 </Paragraph>
      <Paragraph>Address: {props.route.params.dialogInfo.vicinity}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://media.cool-cities.com/macao002pr_f_mob.jpg?h=730' }} />
    <Card.Actions>
      {/* <Button>Cancel</Button> */}
      <Button>Confirm Reservation</Button>
    </Card.Actions>
  </Card>

  <Card>
    <Card.Title title={props.route.params.dialogInfo.title} subtitle="Today - 8:15 PM" />
    <Card.Content>
      {/* <Title>Table for "INSERT NUMBER HERE"</Title> */}
      <Paragraph>Maximum Party Size: 4 </Paragraph>
      <Paragraph>Address: {props.route.params.dialogInfo.vicinity}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://media.cool-cities.com/macao002pr_f_mob.jpg?h=730' }} />
    <Card.Actions>
      {/* <Button>Cancel</Button> */}
      <Button>Confirm Reservation</Button>
    </Card.Actions>
  </Card>

  <Card>
    <Card.Title title={props.route.params.dialogInfo.title} subtitle="Today - 8:30 PM" />
    <Card.Content>
      {/* <Title>Table for "INSERT NUMBER HERE"</Title> */}
      <Paragraph>Maximum Party Size: 6 </Paragraph>
      <Paragraph>Address: {props.route.params.dialogInfo.vicinity}</Paragraph>
    </Card.Content>
    <Card.Cover source={{ uri: 'https://media.cool-cities.com/macao002pr_f_mob.jpg?h=730' }} />
    <Card.Actions>
      {/* <Button>Cancel</Button> */}
      <Button>Confirm Reservation</Button>
    </Card.Actions>
  </Card>
  </ScrollView>
      </PaperProvider>
  );
}

export default SingleRestaurant

const styles = StyleSheet.create({})
