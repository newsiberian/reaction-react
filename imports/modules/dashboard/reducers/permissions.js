import * as types from "../constants";

const initialState = {
  selectedUser: {}
};

export default function accounts(state = initialState, action) {
  switch (action.type) {
  case types.TOGGLE_PERMISSION_SETTINGS:
    return Object.assign({}, state, {
      selectedUser: action.selectedUser || {}
    });
  default:
    return state;
  }
}
