import axios from 'axios';

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
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  // const cart = JSON.parse(window.localStorage.getItem('cart'));
  if (token) {
    const res = await axios.get('/auth/me', {
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
//     window.localStorage.setItem(TOKEN, res.data.token);
//     //localStorage.getItem('token');
//     localStorage.getItem('token');
//     dispatch(me());
//   } catch (authError) {
//     return dispatch(setAuth({ error: authError }));
//   }
// };

export const authenticate = (email, password, method) => async (dispatch) => {
  try {
    // console.log('Did this work????');
    const res = await axios.post(
      `https://redy-capstone.herokuapp.com/auth/${method}`,
      { email, password }
    );
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    console.log('This did work!');
  } catch (authError) {
    console.log('Did this work????');

    return dispatch(setAuth({ error: authError }));
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  window.localStorage.clear();
  logoutCart();
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
