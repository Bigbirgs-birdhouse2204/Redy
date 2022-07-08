import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */
export const me = (navigation) => async (dispatch) => {
  const token = await AsyncStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("https://redy-capstone.herokuapp.com/auth/me", {
      headers: {
        authorization: token,
      },
    });
    dispatch(setAuth(res.data));
    navigation.navigate("Home");
    return;
  }
};

export const authenticate =
  (email, password, method, navigation) => async (dispatch) => {
    try {
      const res = await axios.post(
        `https://redy-capstone.herokuapp.com/auth/${method}`,
        { email, password }
      );
      await AsyncStorage.setItem(TOKEN, res.data.token);
      dispatch(me(navigation));
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const logout = (navigation) => async (dispatch) => {
  await AsyncStorage.removeItem(TOKEN);
  await AsyncStorage.clear();
  navigation.navigate("Sign In");
  return dispatch(setAuth({}));
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
