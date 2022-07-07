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
export const me = () => async (dispatch) => {
  const token = AsyncStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
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

export const authenticate = (email, password, method) => async (dispatch) => {
  try {
    const res = await axios.post(
      `https://redy-capstone.herokuapp.com/auth/${method}`,
      { email, password }
    );
    AsyncStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
  } catch (authError) {
    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  AsyncStorage.removeItem(TOKEN);
  AsyncStorage.clear();
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
