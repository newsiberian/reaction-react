import { combineReducers } from "redux";
import checkout from "./checkout";
import note from "./notes";

const checkoutReducer = combineReducers({
  checkout,
  note
});

export default checkoutReducer;
