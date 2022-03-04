import { combineReducers } from "redux";

import { messageReducer } from "./messageReducer";

import { userReducer, snackbarReducer, navbarReducer } from "./profileReducer";

const CombinedReducers = combineReducers({
  User: userReducer,
  message: messageReducer,
  Snackbar: snackbarReducer,
  Navbar: navbarReducer,
});

export default CombinedReducers;
