import { combineReducers } from "redux";
import alert from "./alert";
import locale from "./locale";
import settings from "./settings";

const layoutReducer = combineReducers({
  alert,
  locale,
  settings
});

export default layoutReducer;
