import axios from "axios";

const SET_NEARBYRESTAURANTS = "SET_NEARBYRESTAURANTS";

export const setAllNearbyRestaurants = (restaurants) => {
  return {
    type: SET_NEARBYRESTAURANTS,
    restaurants,
  };
};
export const fetchAllNearbyRestaurants = () => {
  return async (dispatch) => {
    const { data: restaurants } = await axios.get(
      "https://redy-capstone.herokuapp.com/api/maps"
    );

    dispatch(setAllNearbyRestaurants(restaurants));
  };
};

export const initialState = [];

export default function googleRestaurantReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEARBYRESTAURANTS:
      return [...action.restaurants];
    default:
      return state;
  }
}
