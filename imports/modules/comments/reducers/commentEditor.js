import * as types from "../constants";

const initialState = {
  expanded: false
};

export default function commentEditor(state = initialState, action) {
  switch (action.type) {
  case types.TOGGLE_COMMENT_WINDOW:
    return Object.assign({}, state, {
      expanded: !state.expanded
    });
  default:
    return state;
  }
}
