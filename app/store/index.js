import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import auth from "./auth";
import owner from "./owner";
import googleRestaurantReducer from "./googleRestaurant";
import redyRestaurantReducer from "./redyRestaurant";
import tablesReducer from "./tables";
import reservationsReducer from "./reservation";


const initialState = {};

const reducers = combineReducers({
  auth,
  owner,
  googleRestaurant: googleRestaurantReducer,
  redyRestaurant: redyRestaurantReducer,
  tables: tablesReducer,
  reservations: reservationsReducer,
});

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware,
      createLogger({
        predicate: (getState, action) => action.type !== 'SET_NEARBYREDYRESTAURANTS' && action.type !== 'SET_NEARBYRESTAURANTS'
      })
    )
  );


// const middleware = composeWithDevTools(
//   applyMiddleware(thunkMiddleware,
//     createLogger({
//     predicate: (getState, action) => action.type !== 'SET_NEARBYRESTAURANTS'
//   })
//   )
// );

const store = createStore(reducers, initialState, middleware);

export default store;
export * from "./auth";
export * from "./owner";

