import * as types from "../constants";

const initialState = {
  actionType: "login"
};

export default function inline(state = initialState, action) {
  switch (action.type) {
  case types.CHANGE_ACTION_TYPE:
    return Object.assign({}, state, {
      actionType: action.actionType
    });
  case types.DESTROY_ADDRESSBOOK:
    return Object.assign({}, state, initialState);
  default:
    return state;
  }
}
