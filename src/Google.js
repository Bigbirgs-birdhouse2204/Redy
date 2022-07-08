import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GooglePlacesInput = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
      }}
      query={{
        key: "AIzaSyCsOMga-aTXAiDbUpUV_oYlMWOnhyj4BZM",
        language: "en",
      }}
    />
  );
};

export default GooglePlacesInput;
