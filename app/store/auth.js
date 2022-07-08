import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN = 'token';

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH';

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = (navigation) => async (dispatch) => {
  const token = await AsyncStorage.getItem(TOKEN);
  // const cart = JSON.parse(AsyncStorage.getItem('cart'));
  if (token) {
    const res = await axios.get('https://redy-capstone.herokuapp.com/auth/me', {
      headers: {
        authorization: token,
      },
    });
    dispatch(setAuth(res.data));
    navigation.navigate("Home")
    return
  }
};

// export const authenticate = (formData, method) => async (dispatch) => {
//   try {
//     const res = await axios.post(`/auth/${method}`, formData);
//     AsyncStorage.setItem(TOKEN, res.data.token);
//     //localStorage.getItem('token');
//     localStorage.getItem('token');
//     dispatch(me());
//   } catch (authError) {
//     return dispatch(setAuth({ error: authError }));
//   }
// };

export const authenticate = (email, password, method, navigation) => async (dispatch) => {
  try {
    // console.log('Did this work????');
    const res = await axios.post(
      `https://redy-capstone.herokuapp.com/auth/${method}`,
      { email, password }
    );
   await AsyncStorage.setItem(TOKEN, res.data.token);
    dispatch(me(navigation))
    // navigation.navigate("Home")


    console.log('This did work!');
  } catch (authError) {
    console.log('Did this work????');

    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = async () => {
   await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.clear();
  history.push('/login');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
