import * as types from "../constants";
import { combineReducers } from "redux";

const tags = (state = initialState, action) => {
  switch (action.type) {
  case types.CHANGE_SELECTED:
    // return Object.assign({}, state, {
    //   selectedIndex: action.selectedIndex
    // });
  // case types.DESTROY_CHECKOUT_SHIPPING:
  //   return Object.assign({}, state, initialState);
  default:
    return state;
  }
};

const tagsNavInitialState = { opened: false };

const nav = (state = tagsNavInitialState, action) => {
  switch (action.type) {
  case types.TOGGLE_TAGS_NAV:
    return Object.assign({}, state, {
      opened: !state.opened
    });
  case types.DESTROY_TOGGLE_TAGS_NAV:
    return Object.assign({}, state, tagsNavInitialState);
  default:
    return state;
  }
};

export default combineReducers({
  nav,
  tags
});
