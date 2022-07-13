import axios from "axios";

const SET_TABLES = "SET_TABLES";
const UPDATE_TABLE = "UPDATE_TABLE";

export const setAllTables = (tables) => {
  return {
    type: SET_TABLES,
    tables,
  };
};

export const updateTable = (table) => {
  return {
    type: UPDATE_TABLE,
    table,
  };
};

export const fetchAllTables = (id) => {
  return async (dispatch) => {
    const { data: tables } = await axios.get(
      `https://redy-capstone.herokuapp.com/api/table/restaurant/${id}`
    );
    dispatch(setAllTables(tables));
  };
};

export const editTable = (restaurantId, tableId) => {
  return async (dispatch) => {
    const { data: table } = await axios.put(
      `https://redy-capstone.herokuapp.com/api/table/restaurant/${restaurantId}/${tableId}`, {
        isOccupied: true,
      }
    );
    dispatch(updateTable(table));
  };
};

export const initialState = [];

export default function tablesReducer(state = initialState, action) {
  switch (action.type) {
    case SET_TABLES:
      return [...action.tables];
    case UPDATE_TABLE:
      return state.map((table) =>
        table.id === action.table.id ? action.table : table
      );
    default:
      return state;
  }
}
