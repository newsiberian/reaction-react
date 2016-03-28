import { combineReducers } from "redux";
import alert from "./alert";
import cart from "./cart";
import locale from "./locale";
import settings from "./settings";

const layoutReducer = combineReducers({
  alert,
  cart,
  locale,
  settings
});

export default layoutReducer;
