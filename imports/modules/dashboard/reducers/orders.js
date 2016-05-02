import * as types from "../constants";
import { combineReducers } from "redux";

const filter = (state = "new", action) => {
  switch (action.type) {
  case types.CHANGE_ORDER_FILTER:
    return action.filter;
  default:
    return state;
  }
};

const trackingEdit = (state = { visible: false }, action) => {
  switch (action.type) {
  case types.CHANGE_TRACKING_EDIT_VISIBILITY:
    return Object.assign({}, state, {
      visible: action.visible
    });
  default:
    return state;
  }
};

export default combineReducers({
  filter,
  trackingEdit
});
