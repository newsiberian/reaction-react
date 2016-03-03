import * as types from "../constants";

const initialState = {
  open: false,
  message: "",
  autoHideDuration: 8000
};

export default function alert(state = initialState, action) {
  switch (action.type) {
  case types.CLOSE_ALERT:
  case types.DISPLAY_ALERT:
    return Object.assign({}, state, {
      open: action.open,
      message: action.message
    });
  default:
    return state;
  }
}
