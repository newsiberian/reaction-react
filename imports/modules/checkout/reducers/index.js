// import { combineReducers } from "redux";
// import checkout from "./checkout";
//
// const checkoutReducer = combineReducers({
//   checkout
// });
//
// export default checkoutReducer;

import * as types from "../constants";

const initialState = {
  activeStep: -1
};

export default function checkout(state = initialState, action) {
  switch (action.type) {
  case types.CHANGE_CART_WORKFLOW:
    return Object.assign({}, state, {
      activeStep: action.activeStep
    });
  case types.DESTROY_CHECKOUT:
    return Object.assign({}, state, initialState);
  default:
    return state;
  }
}
