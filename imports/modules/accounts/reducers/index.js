import { combineReducers } from "redux";
import addressBook from "./addressBook";
import inline from "./inline";

const accountReducer = combineReducers({
  addressBook,
  inline
});

export default accountReducer;
