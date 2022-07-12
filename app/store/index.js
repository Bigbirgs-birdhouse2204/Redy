import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import auth from "./auth";
import RestaurantReducer from "./googleRestaurant";

const reducers = combineReducers({
  auth,
  restaurant: RestaurantReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(reducers, undefined, middleware);

export default store;
export * from "./auth";
