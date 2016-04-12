import { combineReducers } from "redux";
import checkout from "./checkout";

const shippingReducer = combineReducers({
  checkout
});

export default shippingReducer;
