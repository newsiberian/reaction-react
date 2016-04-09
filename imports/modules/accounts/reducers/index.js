import { combineReducers } from "redux";
import addressBook from "./addressBook";

const accountReducer = combineReducers({
  addressBook
});

export default accountReducer;
