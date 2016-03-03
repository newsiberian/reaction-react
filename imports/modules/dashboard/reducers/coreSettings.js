import * as types from "../constants";

const initialState = {
  active: "general"
};

export default function cards(state = initialState, action) {
  switch (action.type) {
  case types.TOGGLE_CARD:
    // self-closing action
    if (state.active === action.active) {
      return "";
    }
    return Object.assign({}, state, {
      active: action.active
    });
  default:
    return state;
  }
}
