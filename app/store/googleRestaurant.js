import axios from "axios";

const SET_NEARBYRESTAURANTS = "SET_NEARBYRESTAURANTS";
const SET_SINGLERESTAURANT = "SET_SINGLERESTAURANT";

export const setAllNearbyRestaurants = (restaurants) => {
  return {
    type: SET_NEARBYRESTAURANTS,
    restaurants,
  };
};
export const setSingleRestaurant = (restaurant) => {
  return {
    type: SET_SINGLERESTAURANT,
    restaurant,
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
export const fetchSingleRestaurant = (id) => {
  return async (dispatch) => {
    const { data: restaurant } = await axios.get(
      `https://redy-capstone.herokuapp.com/api/table/restaurant/${id}`
    );

    dispatch(setSingleRestaurant(restaurant));
  };
};
export const initialState = [];
export default function RestaurantReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEARBYRESTAURANTS:
      return [...action.restaurants];
    case SET_SINGLERESTAURANT:
      return [action.restaurant];
    default:
      return state;
  }
}
