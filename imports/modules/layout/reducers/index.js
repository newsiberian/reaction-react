import { combineReducers } from "redux";
import alert from "./alert";
import cart from "./cart";
import settings from "./settings";

const layoutReducer = combineReducers({
  alert,
  cart,
  settings
});

export default layoutReducer;
