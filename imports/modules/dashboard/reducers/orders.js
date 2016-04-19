import * as types from "../constants";
import { combineReducers } from "redux";

const filter = (state = "none", action) => {
  switch (action.type) {
  case types.CHANGE_ORDER_FILTER:
    return action.filter;
  default:
    return state;
  }
};

export default combineReducers({
  filter
});
