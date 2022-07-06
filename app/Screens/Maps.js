import * as React from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
var axios = require("axios");
import Dialog from "react-native-dialog";
import { useNavigation } from "@react-navigation/native";

export default function Maps() {
  const [pin, setPin] = React.useState({
    longitude: -96.10110953450203,
    latitude: 33.64545041829775,
  });

  const navigation = useNavigation();

  const [location, setLocation] = React.useState(null);
  const [errorMsg, setErrorMsg] = React.useState(null);
  const [restaurants, setRestaurants] = React.useState([]);
  const [visibleState, setVisibleState] = React.useState(false);
  const [dialogInfo, setDialogInfo] = React.useState({});

  const handleRedirect = () => {
    setVisibleState(false);
    navigation.navigate("Single Restaurant");
  };

  const findRestaurantsNearby = async (latitude, longitude) => {
    const lat = 40.714184;
    const long = -74.006238;
    var config = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat}%2C${long}&radius=1609&type=restaurant&key=AIzaSyC-OSdHQCLsDAV0CgpJIY7DSMRnPxEkGJ0`,
      headers: {},
    };
    axios(config)
      .then(function (response) {
        console.log(response.data.results);
        setRestaurants(response.data.results);
        JSON.stringify(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleConversion = (priceLevel) => {
    if (dialogInfo.price_level == 1) {
      return "$";
    } else if (dialogInfo.price_level == 2) {
      return "$$";
    } else if (dialogInfo.price_level == 3) {
      return "$$$";
    } else {
      return "";
    }
  };

  React.useEffect(() => {
    let latitude;
    let longitude;
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
      console.log(location);
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;

      setPin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      await findRestaurantsNearby(latitude, longitude);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 40.6884810235732,
          longitude: -73.825052026728,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >
        {!restaurants.length
          ? null
          : restaurants.map((restaurant, index) => {
              return (
                <Marker
                  key={index}
                  coordinate={{
                    longitude: restaurant.geometry.location.lng,
                    latitude: restaurant.geometry.location.lat,
                  }}
                  pinColor="green"
                  title={restaurant.name}
                  onPress={() => {
                    setDialogInfo({
                      title: restaurant.name,
                      rating: restaurant.rating,
                      vicinity: restaurant.vicinity,
                      price_level: restaurant.price_level,
                    });
                    setVisibleState(true);
                  }}
                />
              );
            })}
      </MapView>
      <View>
        <Dialog.Container visible={visibleState}>
          <Dialog.Title>{dialogInfo.title}</Dialog.Title>
          <Dialog.Description>
            <Text>
              Address: {dialogInfo.vicinity}
              {"\n"}
              Rating: {dialogInfo.rating}
              {"\n"}
              Price Level: {handleConversion(dialogInfo.price_level)}
            </Text>
          </Dialog.Description>
          <Dialog.Button
            label="Go Back"
            onPress={() => {
              setVisibleState(false);
            }}
          />

          <Dialog.Button
            label="Reserve Now"
            onPress={() => {
              handleRedirect();
            }}
          />
        </Dialog.Container>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
