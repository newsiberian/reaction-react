import { combineReducers } from "redux";
import alert from "./alert";
import cart from "./cart";

const layoutReducer = combineReducers({
  alert,
  cart
});

export default layoutReducer;
