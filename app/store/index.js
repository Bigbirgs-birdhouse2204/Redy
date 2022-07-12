import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import auth from "./auth";
import googleRestaurantReducer from "./googleRestaurant";
import redyRestaurantReducer from "./redyRestaurant";

const initialState = {};

const reducers = combineReducers({
  auth,
  googleRestaurant: googleRestaurantReducer,
  redyRestaurant: redyRestaurantReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducers, initialState, middleware);

export default store;
export * from "./auth";
