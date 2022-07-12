import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const GET_RESTAURANTS = 'GET_RESTAURANTS';

/**
 * ACTION CREATORS
 */
const getRestaurants = (restaurant) => ({ type: GET_RESTAURANTS, restaurant });

/**
 * THUNK CREATORS
 */


  export const getOwnerRestaurants = () =>
  async (dispatch) => {
    const token = await AsyncStorage.getItem(TOKEN);
    if (token) {
      const {data} = await axios.get(
        'https://redy-capstone.herokuapp.com/api/owner/restaurants',
        {
          headers: {
            authorization: token,
          },
        }
      );
      dispatch(getRestaurants(data));

      return;
    }
  };



/**
 * REDUCER
 */
export default function (state = [], action) {
  switch (action.type) {
    case GET_RESTAURANTS:
      return action.restaurant;
    default:
      return state;
  }
}
