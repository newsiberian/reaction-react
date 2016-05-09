import * as types from "../constants";
import { combineReducers } from "redux";

const tags = (state = {}, action) => {
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

const tagsNavInitialState = {
  opened: false,
  editable: false
};

const nav = (state = tagsNavInitialState, action) => {
  switch (action.type) {
  case types.TOGGLE_TAGS_NAV:
    return Object.assign({}, state, {
      opened: !state.opened
    });
  case types.DESTROY_TOGGLE_TAGS_NAV:
    return Object.assign({}, state, tagsNavInitialState);
  case types.TOGGLE_EDIT_MODE:
    return Object.assign({}, state, {
      editable: !state.editable
    });
  default:
    return state;
  }
};

export default combineReducers({
  nav,
  tags
});
