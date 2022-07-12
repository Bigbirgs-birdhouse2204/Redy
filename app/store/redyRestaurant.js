import axios from "axios";

const SET_NEARBYREDYRESTAURANTS = "SET_NEARBYREDYRESTAURANTS";
const SET_SINGLEREDYRESTAURANT = "SET_SINGLEREDYRESTAURANT";

export const setAllRedyRestaurants = (restaurants) => {
  return {
    type: SET_NEARBYREDYRESTAURANTS,
    restaurants,
  };
};
export const setSingleRedyRestaurant = (restaurant) => {
  return {
    type: SET_SINGLEREDYRESTAURANT,
    restaurant,
  };
};
export const fetchAllRedyRestaurants = () => {
  return async (dispatch) => {
    const { data: restaurants } = await axios.get(
      "https://redy-capstone.herokuapp.com/api/restaurant"
    );

    dispatch(setAllRedyRestaurants(restaurants));
  };
};
export const fetchSingleRedyRestaurant = (id) => {
  return async (dispatch) => {
    const { data: restaurant } = await axios.get(
      `https://redy-capstone.herokuapp.com/api/restaurant/${id}`
    );

    dispatch(setSingleRedyRestaurant(restaurant));
  };
};

export const initialState = [];

export default function redyRestaurantReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEARBYREDYRESTAURANTS:
      return [...action.restaurants];
    case SET_SINGLEREDYRESTAURANT:
      return [action.restaurant];
    default:
      return state;
  }
}
