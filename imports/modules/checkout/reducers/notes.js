import * as types from "../constants";

const initialState = {
  content: "",
  isChanged: false
};

export default function note(state = initialState, action) {
  switch (action.type) {
  case types.CHANGE_CART_NOTE:
    return Object.assign({}, state, {
      content: action.content
    });
  case types.UPDATE_CART_NOTE:
    return Object.assign({}, state, {
      isChanged: true
    });
  case types.ROLLBACK_CART_NOTE_STATE:
    return Object.assign({}, state, {
      isChanged: false
    });
  default:
    return state;
  }
}
