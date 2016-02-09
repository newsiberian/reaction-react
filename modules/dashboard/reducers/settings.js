import * as types from "../constants";

const initialState = {
  open: false,
  package: ""
};

export default function packages(state = initialState, action) {
  switch (action.type) {
  case types.CLOSE_SETTINGS:
  case types.OPEN_SETTINGS:
    return Object.assign({}, state, {
      open: action.open,
      package: action.package
    });
  default:
    return state;
  }
}
