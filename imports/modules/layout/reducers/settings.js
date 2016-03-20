import * as types from "../constants";

const initialState = {
  open: false,
  name: "",
  payload: null
};

export default function packages(state = initialState, action) {
  switch (action.type) {
  case types.CLOSE_SETTINGS:
  case types.OPEN_SETTINGS:
    return Object.assign({}, state, {
      open: action.open,
      name: action.name,
      payload: action.payload
    });
  default:
    return state;
  }
}
