import axios from "axios";

const CREATE_RESERVATION = "CREATE_RESERVATION";

const _createReservation = (reservation) => {
  return {
    type: CREATE_RESERVATION,
    reservation
  };
};



export const createReservation = (reservationObj) => {
  return async (dispatch) => {
    const { data: reservation } = await axios.post('https://redy-capstone.herokuapp.com/api/reservation', reservationObj);
    dispatch(_createReservation(reservation));
  };
};

export const initialState = [];

export default function reservationsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_RESERVATION:
      return [...state, action.reservation];
    default:
      return state;
  }
}
